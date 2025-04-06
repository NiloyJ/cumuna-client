
import React, { useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Swal from 'sweetalert2';

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('MUN Tips');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: 'mb-4',
                    },
                },
            }),
            Underline,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Placeholder.configure({
                placeholder: 'Tell your story... (Press / for commands)',
            }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none p-4',
            },
        },
    });

    const cleanUpHtml = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Remove empty elements
        const emptyElements = tempDiv.querySelectorAll('h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty, p:empty');
        emptyElements.forEach(el => el.remove());

        // Remove empty formatting tags
        const formattingTags = tempDiv.querySelectorAll('strong:empty, em:empty, u:empty');
        formattingTags.forEach(el => {
            while (el.firstChild) {
                el.parentNode.insertBefore(el.firstChild, el);
            }
            el.remove();
        });

        // Add spacing classes only to non-empty paragraphs
        const paragraphs = tempDiv.querySelectorAll('p');
        paragraphs.forEach(p => {
            if (p.textContent.trim() !== '') {
                p.classList.add('mb-4');
            } else {
                p.remove();
            }
        });

        // Style lists
        const uls = tempDiv.querySelectorAll('ul');
        uls.forEach(ul => {
            ul.classList.add('list-disc', 'pl-8', 'mb-4');
        });

        const ols = tempDiv.querySelectorAll('ol');
        ols.forEach(ol => {
            ol.classList.add('list-decimal', 'pl-8', 'mb-4');
        });

        return tempDiv.innerHTML;
    };

    const handleTagInput = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleImageUpload = async (file) => {
        if (!file) return;
        
        setUploadingImage(true);
        
        try {
            // Create a temporary image URL for preview
            const tempUrl = URL.createObjectURL(file);
            
            // Insert temporary image
            editor.commands.setImage({ src: tempUrl, alt: 'Uploading...' });
            
            // Upload to your server
            const formData = new FormData();
            formData.append('image', file);
            
            const response = await fetch('http://localhost:5000/upload-image', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (!response.ok) throw new Error(data.message || 'Failed to upload image');
            
            // Replace temp URL with permanent URL
            editor.commands.setImage({ src: data.imageUrl, alt: file.name });
            
        } catch (error) {
            Swal.fire({
                title: "Upload Failed!",
                text: error.message || "Could not upload image",
                icon: "error",
            });
            // Remove the failed upload
            editor.commands.deleteSelection();
        } finally {
            setUploadingImage(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.match('image.*')) {
                Swal.fire({
                    title: "Invalid File!",
                    text: "Please select an image file (JPEG, PNG, etc.)",
                    icon: "warning",
                });
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                Swal.fire({
                    title: "File Too Large!",
                    text: "Please select an image smaller than 5MB",
                    icon: "warning",
                });
                return;
            }
            
            handleImageUpload(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate content
        const textContent = editor?.getText().trim() || '';
        if (!textContent) {
            Swal.fire({
                title: "Empty Content!",
                text: "Please add some content to your blog post.",
                icon: "warning",
            });
            return;
        }

        if (!title.trim()) {
            Swal.fire({
                title: "Missing Title!",
                text: "Please add a title to your blog post.",
                icon: "warning",
            });
            return;
        }

        setIsLoading(true);

        try {
            let htmlContent = editor.getHTML();
            htmlContent = cleanUpHtml(htmlContent);

            const blogData = {
                title,
                author,
                category,
                tags,
                status: 'Published',
                thumbnailUrl,
                bannerUrl,
                content: htmlContent
            };

            const response = await fetch('http://localhost:5000/blogs/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(blogData)
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: "Published!",
                    text: "Your blog post has been published successfully.",
                    icon: "success",
                });

                // Reset form
                setTitle('');
                setAuthor('');
                setCategory('MUN Tips');
                setTags([]);
                setThumbnailUrl('');
                setBannerUrl('');
                editor.commands.clearContent();
            } else {
                throw new Error(data.message || 'Failed to publish post');
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message || "Failed to publish blog post",
                icon: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const categories = ['MUN Tips', 'Global Affairs', 'Club News', 'Conference Recap', 'Delegate Training'];

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-8">
                <button 
                    onClick={() => window.history.back()}
                    className="text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center"
                >
                    ← Back
                </button>
                <h2 className="text-3xl font-bold mb-2">Create New Post</h2>
                <p className="text-gray-600">Share your MUN experiences and insights</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title */}
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full text-4xl font-bold border-none focus:outline-none focus:ring-0 p-0"
                        required
                    />
                </div>

                {/* Author */}
                <div>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Your name"
                        className="w-full text-lg border-none focus:outline-none focus:ring-0 p-0"
                        required
                    />
                </div>

                {/* Rich Text Editor */}
                <div className="mt-8">
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        {editor && (
                            <>
                                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleBold().run()}
                                        className={`p-2 ${editor.isActive('bold') ? 'bg-gray-100 font-bold' : ''}`}
                                    >
                                        <strong>B</strong>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleItalic().run()}
                                        className={`p-2 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
                                    >
                                        <em>I</em>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                                        className={`p-2 ${editor.isActive('underline') ? 'bg-gray-100' : ''}`}
                                    >
                                        <u>U</u>
                                    </button>
                                    <div className="relative group">
                                        <button 
                                            type="button"
                                            className="p-2 hover:bg-gray-100"
                                        >
                                            H
                                        </button>
                                        <div className="absolute left-0 mt-1 w-24 bg-white shadow-lg rounded-md hidden group-hover:block z-10">
                                            {[1, 2, 3, 4, 5, 6].map(level => (
                                                <button
                                                    key={level}
                                                    type="button"
                                                    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                                                    className={`block w-full text-left px-4 py-2 text-sm ${editor.isActive('heading', { level }) ? 'bg-gray-100' : ''}`}
                                                >
                                                    H{level}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <label className="p-2 hover:bg-gray-100 cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            disabled={uploadingImage}
                                        />
                                        {uploadingImage ? 'Uploading...' : 'Image'}
                                    </label>
                                </BubbleMenu>
                                <EditorContent 
                                    editor={editor} 
                                    className="min-h-[50vh] p-4 focus:outline-none"
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* Metadata Section */}
                <div className="bg-gray-50 p-6 rounded-lg space-y-6">
                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Thumbnail Image URL */}
                    <div>
                        <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            Thumbnail Image URL
                        </label>
                        <input
                            type="url"
                            id="thumbnailUrl"
                            value={thumbnailUrl}
                            onChange={(e) => setThumbnailUrl(e.target.value)}
                            placeholder="https://example.com/thumbnail.jpg"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {thumbnailUrl && (
                            <div className="mt-2">
                                <img
                                    src={thumbnailUrl}
                                    alt="Thumbnail preview"
                                    className="h-20 w-auto rounded"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/150?text=Thumbnail+Not+Found';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Banner Image URL */}
                    <div>
                        <label htmlFor="bannerUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            Banner Image URL
                        </label>
                        <input
                            type="url"
                            id="bannerUrl"
                            value={bannerUrl}
                            onChange={(e) => setBannerUrl(e.target.value)}
                            placeholder="https://example.com/banner.jpg"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {bannerUrl && (
                            <div className="mt-2">
                                <img
                                    src={bannerUrl}
                                    alt="Banner preview"
                                    className="h-40 w-full object-cover rounded"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/800x200?text=Banner+Not+Found';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        disabled={isLoading || uploadingImage}
                    >
                        {isLoading ? 'Publishing...' : 'Publish Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;


