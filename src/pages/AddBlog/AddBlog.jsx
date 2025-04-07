

// import React, { useState, useRef } from 'react';
// import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import Placeholder from '@tiptap/extension-placeholder';
// import Image from '@tiptap/extension-image';
// import Swal from 'sweetalert2';
// import { API_URL } from '../../config/config';

// const AddBlog = () => {
//     const [title, setTitle] = useState('');
//     const [author, setAuthor] = useState('');
//     const [category, setCategory] = useState('MUN Tips');
//     const [tags, setTags] = useState([]);
//     const [tagInput, setTagInput] = useState('');
//     const [thumbnailUrl, setThumbnailUrl] = useState('');
//     const [bannerUrl, setBannerUrl] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [uploadingImage, setUploadingImage] = useState(false);

//     const editor = useEditor({
//         extensions: [
//             StarterKit.configure({
//                 paragraph: {
//                     HTMLAttributes: {
//                         class: 'mb-4',
//                     },
//                 },
//                 heading: {
//                     levels: [1, 2, 3],
//                     HTMLAttributes: {
//                         class: 'font-bold',
//                     },
//                 },
//             }),
//             Underline,
//             Image.configure({
//                 inline: true,
//                 allowBase64: true,
//             }),
//             Placeholder.configure({
//                 placeholder: 'Tell your story... (Press / for commands)',
//             }),
//         ],
//         content: '',
//         editorProps: {
//             attributes: {
//                 class: 'prose prose-lg max-w-none focus:outline-none p-4',
//             },
//         },
//     });

//     const cleanUpHtml = (html) => {
//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = html;

//         // Remove empty elements
//         const emptyElements = tempDiv.querySelectorAll('h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty, p:empty');
//         emptyElements.forEach(el => el.remove());

//         // Remove empty formatting tags
//         const formattingTags = tempDiv.querySelectorAll('strong:empty, em:empty, u:empty');
//         formattingTags.forEach(el => {
//             while (el.firstChild) {
//                 el.parentNode.insertBefore(el.firstChild, el);
//             }
//             el.remove();
//         });

//         // Add spacing classes only to non-empty paragraphs
//         const paragraphs = tempDiv.querySelectorAll('p');
//         paragraphs.forEach(p => {
//             if (p.textContent.trim() !== '') {
//                 p.classList.add('mb-4');
//             } else {
//                 p.remove();
//             }
//         });

//         // Style lists
//         const uls = tempDiv.querySelectorAll('ul');
//         uls.forEach(ul => {
//             ul.classList.add('list-disc', 'pl-8', 'mb-4', 'border-l-2', 'border-gray-200');
            
//             // Style list items
//             const lis = ul.querySelectorAll('li');
//             lis.forEach(li => {
//                 li.classList.add('ml-4', 'py-1');
//             });
//         });

//         const ols = tempDiv.querySelectorAll('ol');
//         ols.forEach(ol => {
//             ol.classList.add('list-decimal', 'pl-8', 'mb-4', 'border-l-2', 'border-gray-200');
            
//             // Style list items
//             const lis = ol.querySelectorAll('li');
//             lis.forEach(li => {
//                 li.classList.add('ml-4', 'py-1');
//             });
//         });

//         return tempDiv.innerHTML;
//     };

//     const handleTagInput = (e) => {
//         if (e.key === 'Enter' && tagInput.trim()) {
//             setTags([...tags, tagInput.trim()]);
//             setTagInput('');
//         }
//     };

//     const removeTag = (index) => {
//         setTags(tags.filter((_, i) => i !== index));
//     };

//     const handleImageUpload = async (file) => {
//         if (!file) return;
        
//         setUploadingImage(true);
        
//         try {
//             // Create a temporary image URL for preview
//             const tempUrl = URL.createObjectURL(file);
            
//             // Insert temporary image
//             editor.commands.setImage({ src: tempUrl, alt: 'Uploading...' });
            
//             // Upload to your server
//             const formData = new FormData();
//             formData.append('image', file);
            
//             const response = await fetch(`${API_URL}/upload-image`, {
//                 method: 'POST',
//                 body: formData
//             });
            
//             const data = await response.json();
            
//             if (!response.ok) throw new Error(data.message || 'Failed to upload image');
            
//             // Replace temp URL with permanent URL
//             editor.commands.setImage({ src: data.imageUrl, alt: file.name });
            
//         } catch (error) {
//             Swal.fire({
//                 title: "Upload Failed!",
//                 text: error.message || "Could not upload image",
//                 icon: "error",
//             });
//             // Remove the failed upload
//             editor.commands.deleteSelection();
//         } finally {
//             setUploadingImage(false);
//         }
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (!file.type.match('image.*')) {
//                 Swal.fire({
//                     title: "Invalid File!",
//                     text: "Please select an image file (JPEG, PNG, etc.)",
//                     icon: "warning",
//                 });
//                 return;
//             }
            
//             if (file.size > 5 * 1024 * 1024) { // 5MB limit
//                 Swal.fire({
//                     title: "File Too Large!",
//                     text: "Please select an image smaller than 5MB",
//                     icon: "warning",
//                 });
//                 return;
//             }
            
//             handleImageUpload(file);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Validate content
//         const textContent = editor?.getText().trim() || '';
//         if (!textContent) {
//             Swal.fire({
//                 title: "Empty Content!",
//                 text: "Please add some content to your blog post.",
//                 icon: "warning",
//             });
//             return;
//         }

//         if (!title.trim()) {
//             Swal.fire({
//                 title: "Missing Title!",
//                 text: "Please add a title to your blog post.",
//                 icon: "warning",
//             });
//             return;
//         }

//         setIsLoading(true);

//         try {
//             let htmlContent = editor.getHTML();
            
//             // Process HTML to ensure headings are properly styled
//             const tempDiv = document.createElement('div');
//             tempDiv.innerHTML = htmlContent;
            
//             // Style headings
//             const h1s = tempDiv.querySelectorAll('h1');
//             h1s.forEach(h1 => {
//                 h1.classList.add('text-5xl', 'font-extrabold', 'mb-6', 'text-black');
//             });

//             const h2s = tempDiv.querySelectorAll('h2');
//             h2s.forEach(h2 => {
//                 h2.classList.add('text-4xl', 'font-bold', 'mb-4', 'text-black');
//             });

//             const h3s = tempDiv.querySelectorAll('h3');
//             h3s.forEach(h3 => {
//                 h3.classList.add('text-3xl', 'font-bold', 'mb-3', 'text-black');
//             });
            
//             htmlContent = tempDiv.innerHTML;
//             htmlContent = cleanUpHtml(htmlContent);

//             const blogData = {
//                 title,
//                 author,
//                 category,
//                 tags,
//                 status: 'Published',
//                 thumbnailUrl,
//                 bannerUrl,
//                 content: htmlContent
//             };

//             const response = await fetch(`${API_URL}/blogs/`, {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json',
//                 },
//                 body: JSON.stringify(blogData)
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 Swal.fire({
//                     title: "Published!",
//                     text: "Your blog post has been published successfully.",
//                     icon: "success",
//                 });

//                 // Reset form
//                 setTitle('');
//                 setAuthor('');
//                 setCategory('MUN Tips');
//                 setTags([]);
//                 setThumbnailUrl('');
//                 setBannerUrl('');
//                 editor.commands.clearContent();
//             } else {
//                 throw new Error(data.message || 'Failed to publish post');
//             }
//         } catch (error) {
//             Swal.fire({
//                 title: "Error!",
//                 text: error.message || "Failed to publish blog post",
//                 icon: "error",
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const categories = ['MUN Tips', 'Global Affairs', 'Club News', 'Conference Recap', 'Delegate Training'];

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <div className="mb-8">
//                 <button 
//                     onClick={() => window.history.back()}
//                     className="text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center"
//                 >
//                     ← Back
//                 </button>
//                 <h2 className="text-3xl font-bold mb-2">Create New Post</h2>
//                 <p className="text-gray-600">Share your MUN experiences and insights</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Title */}
//                 <div>
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         placeholder="Title"
//                         className="w-full text-4xl font-bold border-none focus:outline-none focus:ring-0 p-0"
//                         required
//                     />
//                 </div>

//                 {/* Author */}
//                 <div>
//                     <input
//                         type="text"
//                         value={author}
//                         onChange={(e) => setAuthor(e.target.value)}
//                         placeholder="Your name"
//                         className="w-full text-lg border-none focus:outline-none focus:ring-0 p-0"
//                         required
//                     />
//                 </div>

//                 {/* Rich Text Editor */}
//                 <div className="mt-8">
//                     <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//                         {editor && (
//                             <>
//                                 <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
//                                     <button
//                                         type="button"
//                                         onClick={() => editor.chain().focus().toggleBold().run()}
//                                         className={`p-2 ${editor.isActive('bold') ? 'bg-gray-100 font-bold' : ''}`}
//                                     >
//                                         <strong>B</strong>
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => editor.chain().focus().toggleItalic().run()}
//                                         className={`p-2 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
//                                     >
//                                         <em>I</em>
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => editor.chain().focus().toggleUnderline().run()}
//                                         className={`p-2 ${editor.isActive('underline') ? 'bg-gray-100' : ''}`}
//                                     >
//                                         <u>U</u>
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                                         className={`p-2 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 font-bold' : ''}`}
//                                     >
//                                         H1
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//                                         className={`p-2 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 font-bold' : ''}`}
//                                     >
//                                         H2
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//                                         className={`p-2 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-100 font-bold' : ''}`}
//                                     >
//                                         H3
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => editor.chain().focus().toggleBulletList().run()}
//                                         className={`p-2 ${editor.isActive('bulletList') ? 'bg-gray-100 font-bold text-blue-600' : ''}`}
//                                     >
//                                         •
//                                     </button>
//                                     <label className="p-2 hover:bg-gray-100 cursor-pointer">
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={handleFileChange}
//                                             className="hidden"
//                                             disabled={uploadingImage}
//                                         />
//                                         {uploadingImage ? 'Uploading...' : 'Image'}
//                                     </label>
//                                 </BubbleMenu>
//                                 <EditorContent 
//                                     editor={editor} 
//                                     className="min-h-[50vh] p-4 focus:outline-none [&_h1]:text-5xl [&_h1]:font-extrabold [&_h1]:mb-6 [&_h1]:text-black [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:text-black [&_h3]:text-3xl [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:text-black [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:mb-4 [&_li]:ml-4"
//                                 />
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 {/* Metadata Section */}
//                 <div className="bg-gray-50 p-6 rounded-lg space-y-6">
//                     {/* Category */}
//                     <div>
//                         <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
//                             Category
//                         </label>
//                         <select
//                             id="category"
//                             value={category}
//                             onChange={(e) => setCategory(e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
//                         >
//                             {categories.map((cat) => (
//                                 <option key={cat} value={cat}>{cat}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Thumbnail Image URL */}
//                     <div>
//                         <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-2">
//                             Thumbnail Image URL
//                         </label>
//                         <input
//                             type="url"
//                             id="thumbnailUrl"
//                             value={thumbnailUrl}
//                             onChange={(e) => setThumbnailUrl(e.target.value)}
//                             placeholder="https://example.com/thumbnail.jpg"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                         />
//                         {thumbnailUrl && (
//                             <div className="mt-2">
//                                 <img
//                                     src={thumbnailUrl}
//                                     alt="Thumbnail preview"
//                                     className="h-20 w-auto rounded"
//                                     onError={(e) => {
//                                         e.target.onerror = null;
//                                         e.target.src = 'https://via.placeholder.com/150?text=Thumbnail+Not+Found';
//                                     }}
//                                 />
//                             </div>
//                         )}
//                     </div>

//                     {/* Banner Image URL */}
//                     <div>
//                         <label htmlFor="bannerUrl" className="block text-sm font-medium text-gray-700 mb-2">
//                             Banner Image URL
//                         </label>
//                         <input
//                             type="url"
//                             id="bannerUrl"
//                             value={bannerUrl}
//                             onChange={(e) => setBannerUrl(e.target.value)}
//                             placeholder="https://example.com/banner.jpg"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                         />
//                         {bannerUrl && (
//                             <div className="mt-2">
//                                 <img
//                                     src={bannerUrl}
//                                     alt="Banner preview"
//                                     className="h-40 w-full object-cover rounded"
//                                     onError={(e) => {
//                                         e.target.onerror = null;
//                                         e.target.src = 'https://via.placeholder.com/800x200?text=Banner+Not+Found';
//                                     }}
//                                 />
//                             </div>
//                         )}
//                     </div>

                    
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-end">
//                     <button
//                         type="submit"
//                         className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
//                         disabled={isLoading || uploadingImage}
//                     >
//                         {isLoading ? 'Publishing...' : 'Publish Post'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddBlog;

import React, { useState, useRef } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Swal from 'sweetalert2';
import { API_URL } from '../../config/config';

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
                heading: {
                    levels: [1, 2, 3],
                    HTMLAttributes: {
                        class: 'font-bold',
                    },
                },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline hover:text-blue-800',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
            }),
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
            ul.classList.add('list-disc', 'pl-8', 'mb-4', 'border-l-2', 'border-gray-200');
            
            // Style list items
            const lis = ul.querySelectorAll('li');
            lis.forEach(li => {
                li.classList.add('ml-4', 'py-1');
            });
        });

        const ols = tempDiv.querySelectorAll('ol');
        ols.forEach(ol => {
            ol.classList.add('list-decimal', 'pl-8', 'mb-4', 'border-l-2', 'border-gray-200');
            
            // Style list items
            const lis = ol.querySelectorAll('li');
            lis.forEach(li => {
                li.classList.add('ml-4', 'py-1');
            });
        });

        // Style links
        const links = tempDiv.querySelectorAll('a');
        links.forEach(link => {
            link.classList.add('text-blue-600', 'underline', 'hover:text-blue-800');
            // Ensure links open in a new tab
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
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
            
            const response = await fetch(`${API_URL}/upload-image`, {
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
            
            // Process HTML to ensure headings are properly styled
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            
            // Style headings
            const h1s = tempDiv.querySelectorAll('h1');
            h1s.forEach(h1 => {
                h1.classList.add('text-5xl', 'font-extrabold', 'mb-6', 'text-black');
            });

            const h2s = tempDiv.querySelectorAll('h2');
            h2s.forEach(h2 => {
                h2.classList.add('text-4xl', 'font-bold', 'mb-4', 'text-black');
            });

            const h3s = tempDiv.querySelectorAll('h3');
            h3s.forEach(h3 => {
                h3.classList.add('text-3xl', 'font-bold', 'mb-3', 'text-black');
            });
            
            htmlContent = tempDiv.innerHTML;
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

            const response = await fetch(`${API_URL}/blogs/`, {
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
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                        className={`p-2 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 font-bold' : ''}`}
                                    >
                                        H1
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                        className={`p-2 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 font-bold' : ''}`}
                                    >
                                        H2
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                        className={`p-2 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-100 font-bold' : ''}`}
                                    >
                                        H3
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                                        className={`p-2 ${editor.isActive('bulletList') ? 'bg-gray-100 font-bold text-blue-600' : ''}`}
                                    >
                                        •
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // Check if we're in a link
                                            const isLink = editor.isActive('link');
                                            
                                            if (isLink) {
                                                // If we're in a link, unlink it
                                                editor.chain().focus().unsetLink().run();
                                                return;
                                            }
                                            
                                            // If we're not in a link, create a new one
                                            const url = window.prompt('Enter URL:');
                                            
                                            // cancelled
                                            if (url === null) {
                                                return;
                                            }
                                            
                                            // empty
                                            if (url === '') {
                                                return;
                                            }
                                            
                                            // create link
                                            editor.chain().focus().setLink({ href: url }).run();
                                        }}
                                        className={`p-2 ${editor.isActive('link') ? 'bg-gray-100 font-bold text-blue-600' : ''}`}
                                    >
                                        🔗
                                    </button>
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
                                    className="min-h-[50vh] p-4 focus:outline-none [&_h1]:text-5xl [&_h1]:font-extrabold [&_h1]:mb-6 [&_h1]:text-black [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:text-black [&_h3]:text-3xl [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:text-black [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:mb-4 [&_li]:ml-4 [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800"
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

