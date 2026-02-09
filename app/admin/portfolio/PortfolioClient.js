'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Recommended image dimensions
const RECOMMENDED_WIDTH = 800;
const RECOMMENDED_HEIGHT = 450;
const ASPECT_RATIO = 16 / 9;

// Get cropped image as blob
function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.min(crop.width * scaleX, RECOMMENDED_WIDTH);
    canvas.height = Math.min(crop.height * scaleY, RECOMMENDED_HEIGHT);

    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(new File([blob], fileName, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.9);
    });
}

// Sortable Card Component
function SortableCard({ item, index, onEdit, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        scale: isDragging ? '1.02' : '1',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`rounded-lg border bg-[#0B0B0F] overflow-hidden relative cursor-grab active:cursor-grabbing touch-none ${isDragging ? 'border-[#FF7302] shadow-lg shadow-[#FF7302]/20' : 'border-white/10'}`}
        >
            {/* Order Badge */}
            <div className="absolute top-2 left-2 z-10 bg-[#FF7302] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center pointer-events-none">
                {index + 1}
            </div>

            {/* Drag Indicator */}
            <div className="absolute top-2 right-2 z-10 w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
            </div>

            {/* Image */}
            <div className="h-32 bg-white/5 flex items-center justify-center pointer-events-none relative">
                {item.image_url ? (
                    <Image
                        src={item.image_url}
                        alt={item.title}
                        width={300}
                        height={128}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-gray-500 text-sm">No image</span>
                )}
                {/* Category Tag Overlay */}
                <div className="absolute bottom-2 left-2">
                    <span className="inline-block text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                        {item.tag}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 pointer-events-none">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-3 truncate">
                    {item.href}
                </p>

                <div className="flex gap-2 pointer-events-auto">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                        className="flex-1 rounded-[5px] border border-white/10 py-1.5 text-sm hover:bg-white/5"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                        className="flex-1 rounded-[5px] border border-red-500/30 text-red-400 py-1.5 text-sm hover:bg-red-500/10"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PortfolioClient() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const fileInputRef = useRef(null);
    const imgRef = useRef(null);

    // Drag and drop sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Handle drag end
    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems);

        // Update display_order in database
        try {
            for (let i = 0; i < newItems.length; i++) {
                await fetch(`/api/portfolio/${newItems[i].id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ display_order: i + 1 })
                });
            }
            setMessage({ type: 'success', text: 'Order updated!' });
        } catch (e) {
            setMessage({ type: 'error', text: 'Failed to update order' });
            fetchPortfolio();
        }
    };

    // Cropping state
    const [showCropper, setShowCropper] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [crop, setCrop] = useState({ unit: '%', width: 90, aspect: ASPECT_RATIO });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        tag: '',
        href: '',
        image_url: ''
    });

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const res = await fetch('/api/portfolio');
            const data = await res.json();
            if (data.ok) {
                setItems(data.items);
            }
        } catch (e) {
            console.error('Failed to fetch portfolio:', e);
        } finally {
            setLoading(false);
        }
    };

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setOriginalFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
            setShowCropper(true);
            setCrop({ unit: '%', width: 90, aspect: ASPECT_RATIO });
        };
        reader.readAsDataURL(file);
    };

    const onImageLoad = useCallback((e) => {
        imgRef.current = e.currentTarget;
        const { width, height } = e.currentTarget;

        // Set initial centered crop
        const cropWidth = Math.min(width * 0.9, width);
        const cropHeight = cropWidth / ASPECT_RATIO;
        const x = (width - cropWidth) / 2;
        const y = (height - cropHeight) / 2;

        setCrop({
            unit: 'px',
            width: cropWidth,
            height: cropHeight,
            x,
            y
        });
    }, []);

    const handleCropComplete = async () => {
        if (!imgRef.current || !completedCrop) {
            setMessage({ type: 'error', text: 'Please select a crop area' });
            return;
        }

        try {
            setMessage({ type: 'info', text: 'Processing and uploading...' });

            const croppedFile = await getCroppedImg(
                imgRef.current,
                completedCrop,
                originalFile?.name || 'cropped.jpg'
            );

            const uploadForm = new FormData();
            uploadForm.append('file', croppedFile);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadForm
            });
            const data = await res.json();

            if (data.ok) {
                setFormData(prev => ({ ...prev, image_url: data.url }));
                setMessage({ type: 'success', text: 'Image cropped and uploaded!' });
                closeCropper();
            } else {
                setMessage({ type: 'error', text: data.error || 'Upload failed' });
            }
        } catch (e) {
            console.error('Crop error:', e);
            setMessage({ type: 'error', text: 'Failed to process image' });
        }
    };

    const closeCropper = () => {
        setShowCropper(false);
        setImageSrc('');
        setCompletedCrop(null);
        setOriginalFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const url = editingId ? `/api/portfolio/${editingId}` : '/api/portfolio';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.ok) {
                setMessage({ type: 'success', text: editingId ? 'Updated!' : 'Added!' });
                resetForm();
                fetchPortfolio();
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to save' });
            }
        } catch (e) {
            setMessage({ type: 'error', text: 'Something went wrong' });
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            title: item.title,
            tag: item.tag,
            href: item.href,
            image_url: item.image_url || ''
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this portfolio item?')) return;

        try {
            const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
            const data = await res.json();

            if (data.ok) {
                setMessage({ type: 'success', text: 'Deleted!' });
                fetchPortfolio();
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to delete' });
            }
        } catch (e) {
            setMessage({ type: 'error', text: 'Failed to delete' });
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setShowAddForm(false);
        setFormData({ title: '', tag: '', href: '', image_url: '' });
        closeCropper();
    };

    return (
        <main className="mx-auto max-w-6xl px-4 text-white py-10">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-semibold">Portfolio Management</h1>
                    <p className="mt-2 text-gray-400">Add, edit, or delete your portfolio items</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/leads"
                        className="rounded-[5px] border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                        Back to Leads
                    </Link>
                    <button
                        onClick={() => { resetForm(); setShowAddForm(true); }}
                        className="rounded-[5px] bg-[#FF7302] px-4 py-2 text-sm font-medium hover:bg-[#FF7302]/90 transition-colors"
                    >
                        + Add New
                    </button>
                </div>
            </div>

            {/* Message */}
            {message.text && (
                <div className={`mb-6 p-3 rounded-[5px] text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Image Cropper Modal */}
            {showCropper && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0B0B0F] rounded-lg border border-white/10 max-w-3xl w-full max-h-[90vh] overflow-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Crop Image</h3>
                            <button onClick={closeCropper} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                        </div>

                        <p className="text-sm text-gray-400 mb-4">
                            📐 Drag to adjust crop area. Recommended: <span className="text-[#FF7302]">{RECOMMENDED_WIDTH} × {RECOMMENDED_HEIGHT}px</span> (16:9 ratio)
                        </p>

                        <div className="flex justify-center mb-4 bg-black/50 rounded-lg p-4">
                            <ReactCrop
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={ASPECT_RATIO}
                            >
                                <img
                                    src={imageSrc}
                                    alt="Crop preview"
                                    onLoad={onImageLoad}
                                    style={{ maxHeight: '60vh', maxWidth: '100%' }}
                                />
                            </ReactCrop>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={closeCropper}
                                className="rounded-[5px] border border-white/10 px-6 py-2 hover:bg-white/5"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCropComplete}
                                className="rounded-[5px] bg-[#FF7302] px-6 py-2 font-medium hover:bg-[#FF7302]/90"
                            >
                                Crop & Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Form */}
            {showAddForm && (
                <div className="mb-8 rounded-lg border border-white/10 bg-[#0B0B0F] p-6">
                    <h2 className="text-xl font-medium mb-4">
                        {editingId ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Project Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                                    className="w-full rounded-[5px] border border-white/10 bg-[#060609] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Category Tag *</label>
                                <input
                                    type="text"
                                    value={formData.tag}
                                    onChange={(e) => setFormData(p => ({ ...p, tag: e.target.value }))}
                                    placeholder="e.g. Fashion, Hospital, Legal Firm"
                                    className="w-full rounded-[5px] border border-white/10 bg-[#060609] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Website URL *</label>
                            <div className="flex gap-3">
                                <input
                                    type="url"
                                    value={formData.href}
                                    onChange={(e) => setFormData(p => ({ ...p, href: e.target.value }))}
                                    placeholder="https://example.com"
                                    className="flex-1 rounded-[5px] border border-white/10 bg-[#060609] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={async () => {
                                        if (!formData.href) {
                                            setMessage({ type: 'error', text: 'Please enter a URL first' });
                                            return;
                                        }
                                        try {
                                            setMessage({ type: 'info', text: 'Fetching website info...' });
                                            const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(formData.href)}&screenshot=true`);
                                            const data = await res.json();

                                            if (data.status === 'success') {
                                                const { title, screenshot } = data.data;

                                                // Extract category from URL domain
                                                let category = 'Website';
                                                try {
                                                    const url = new URL(formData.href);
                                                    const domain = url.hostname.replace('www.', '');
                                                    // Try to get a meaningful category from the domain
                                                    if (domain.includes('shop') || domain.includes('store')) category = 'E-Commerce';
                                                    else if (domain.includes('blog')) category = 'Blog';
                                                    else if (domain.includes('law') || domain.includes('legal')) category = 'Legal';
                                                    else if (domain.includes('health') || domain.includes('clinic') || domain.includes('hospital') || domain.includes('dental')) category = 'Healthcare';
                                                    else if (domain.includes('tech') || domain.includes('software') || domain.includes('app')) category = 'Technology';
                                                    else if (domain.includes('fashion') || domain.includes('style') || domain.includes('cloth')) category = 'Fashion';
                                                    else if (domain.includes('food') || domain.includes('restaurant') || domain.includes('cafe')) category = 'Food & Beverage';
                                                    else if (domain.includes('travel') || domain.includes('hotel') || domain.includes('tour')) category = 'Travel';
                                                    else if (domain.includes('edu') || domain.includes('school') || domain.includes('academy')) category = 'Education';
                                                    else if (domain.includes('real') || domain.includes('property') || domain.includes('home')) category = 'Real Estate';
                                                    else category = 'Business';
                                                } catch { }

                                                setFormData(prev => ({
                                                    ...prev,
                                                    title: title || prev.title,
                                                    tag: prev.tag || category,
                                                    image_url: screenshot?.url || prev.image_url
                                                }));

                                                setMessage({ type: 'success', text: 'Website info fetched! Review and edit if needed.' });
                                            } else {
                                                throw new Error('Could not fetch website info');
                                            }
                                        } catch (e) {
                                            setMessage({ type: 'error', text: 'Failed to fetch info. Please fill manually.' });
                                        }
                                    }}
                                    className="rounded-[5px] border border-[#FF7302]/30 bg-[#FF7302]/10 px-3 py-2 text-xs font-medium text-[#FF7302] hover:bg-[#FF7302]/20 transition-colors flex items-center gap-2 whitespace-nowrap"
                                >
                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Magic Fetch
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">
                                ✨ Click Magic Fetch to auto-fill title, category \u0026 screenshot
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Project Image</label>
                            <p className="text-xs text-gray-500 mb-2">
                                📐 Recommended: <span className="text-[#FF7302]">{RECOMMENDED_WIDTH} × {RECOMMENDED_HEIGHT}px</span> (16:9). You can crop after selecting an image.
                            </p>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="text"
                                    value={formData.image_url}
                                    onChange={(e) => setFormData(p => ({ ...p, image_url: e.target.value }))}
                                    placeholder="Image URL or upload below"
                                    className="flex-1 rounded-[5px] border border-white/10 bg-[#060609] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={onSelectFile}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="rounded-[5px] border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
                                >
                                    Upload & Crop
                                </button>
                            </div>
                            {formData.image_url && (
                                <div className="mt-3 relative w-48 h-28 rounded overflow-hidden border border-white/10">
                                    <Image
                                        src={formData.image_url}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-[5px] bg-[#FF7302] px-6 py-2 font-medium hover:bg-[#FF7302]/90 disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : (editingId ? 'Update' : 'Add Item')}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-[5px] border border-white/10 px-6 py-2 hover:bg-white/5"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Portfolio Grid */}
            {loading ? (
                <div className="text-center text-gray-400 py-12">Loading...</div>
            ) : items.length === 0 ? (
                <div className="text-center text-gray-400 py-12 border border-white/10 rounded-lg">
                    <p className="mb-4">No portfolio items yet</p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="text-[#FF7302] hover:underline"
                    >
                        Add your first project
                    </button>
                </div>
            ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((item, index) => (
                                <SortableCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </main>
    );
}
