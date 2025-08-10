import React, { useState, useRef, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaImage,
  FaUpload,
  FaSpinner,
} from "react-icons/fa";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  onImageUpload,
}) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formatState, setFormatState] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const [cursorPosition, setCursorPosition] = useState(null);
  const updateTimeoutRef = useRef(null);

  // Save cursor position
  const saveCursorPosition = () => {
    if (editorRef.current && window.getSelection) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        setCursorPosition({
          startContainer: range.startContainer,
          startOffset: range.startOffset,
          endContainer: range.endContainer,
          endOffset: range.endOffset,
        });
      }
    }
  };

  // Restore cursor position
  const restoreCursorPosition = () => {
    if (cursorPosition && window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();

      try {
        range.setStart(
          cursorPosition.startContainer,
          cursorPosition.startOffset
        );
        range.setEnd(cursorPosition.endContainer, cursorPosition.endOffset);
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (error) {
        // If cursor position is invalid, place cursor at the end
        const editor = editorRef.current;
        if (editor) {
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(editor);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  };

  // Debounced content update
  const debouncedUpdateContent = () => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      if (editorRef.current) {
        const content = editorRef.current.innerHTML;
        onChange(content);
      }
    }, 100); // 100ms delay
  };

  useEffect(() => {
    if (editorRef.current) {
      // Only update if the content is actually different to avoid cursor jumping
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
        // Ensure proper text direction
        editorRef.current.style.direction = "ltr";
        editorRef.current.style.textAlign = "left";
        editorRef.current.style.unicodeBidi = "normal";
      }
    }

    // Cleanup timeout on unmount
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      // Save cursor position before updating content
      saveCursorPosition();

      const content = editorRef.current.innerHTML;
      console.log("Editor content updated:", content); // Debug log
      onChange(content);
      updateFormatState();

      // Restore cursor position after a short delay to ensure DOM is updated
      setTimeout(() => {
        restoreCursorPosition();
      }, 0);
    }
  };

  const updateFormatState = () => {
    if (editorRef.current) {
      setFormatState({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
      });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleKeyDown = (e) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          execCommand("bold");
          break;
        case "i":
          e.preventDefault();
          execCommand("italic");
          break;
        case "u":
          e.preventDefault();
          execCommand("underline");
          break;
        case "z":
          if (e.shiftKey) {
            e.preventDefault();
            execCommand("redo");
          } else {
            e.preventDefault();
            execCommand("undo");
          }
          break;
      }
    }

    // Handle Enter + Shift for line break
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      execCommand("insertLineBreak");
    }
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploadingImage(true);

    try {
      let imageUrl;

      if (onImageUpload) {
        // Use custom image upload function if provided
        imageUrl = await onImageUpload(file);
      } else {
        // Create a local URL for preview
        imageUrl = URL.createObjectURL(file);
      }

      // Check if we got a valid image URL
      if (!imageUrl) {
        throw new Error("Failed to get image URL");
      }

      console.log("Inserting image with URL:", imageUrl); // Debug log

      // Test if the image URL is accessible
      try {
        const testImg = new Image();
        testImg.onload = () => {
          console.log("Image URL is accessible:", imageUrl);
        };
        testImg.onerror = () => {
          console.error("Image URL is not accessible:", imageUrl);
          // Try to create a simple img element to debug
          const debugImg = document.createElement("img");
          debugImg.src = imageUrl;
          debugImg.style.width = "100px";
          debugImg.style.height = "100px";
          debugImg.style.border = "2px solid red";
          document.body.appendChild(debugImg);
          setTimeout(() => {
            document.body.removeChild(debugImg);
          }, 5000);
        };
        testImg.src = imageUrl;
      } catch (error) {
        console.error("Error testing image URL:", error);
      }

      // Insert image at cursor position
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        // Simple and reliable image insertion
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Uploaded image";
        imgElement.className = "max-w-full h-auto rounded-lg my-4";
        imgElement.style.maxWidth = "100%";
        imgElement.style.height = "auto";
        imgElement.style.borderRadius = "0.5rem";
        imgElement.style.margin = "1rem 0";
        imgElement.style.display = "block";

        imgElement.onerror = () => {
          console.error("Failed to load image:", imageUrl);
          alert("Failed to load image. Please try again.");
        };

        imgElement.onload = () => {
          console.log("Image loaded successfully:", imageUrl);
        };

        // Insert the image
        range.deleteContents();
        range.insertNode(imgElement);

        // Add a line break after the image
        const br = document.createElement("br");
        range.setStartAfter(imgElement);
        range.insertNode(br);

        // Move cursor after the image
        range.setStartAfter(br);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

        // Focus the editor and update content
        editorRef.current?.focus();
        updateContent();
      } else {
        // If no selection, append to the end
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Uploaded image";
        imgElement.className = "max-w-full h-auto rounded-lg my-4";
        imgElement.style.maxWidth = "100%";
        imgElement.style.height = "auto";
        imgElement.style.borderRadius = "0.5rem";
        imgElement.style.margin = "1rem 0";
        imgElement.style.display = "block";

        imgElement.onerror = () => {
          console.error("Failed to load image:", imageUrl);
          alert("Failed to load image. Please try again.");
        };

        imgElement.onload = () => {
          console.log("Image loaded successfully:", imageUrl);
        };

        editorRef.current?.appendChild(imgElement);
        editorRef.current?.appendChild(document.createElement("br"));
        updateContent();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const ToolbarButton = ({ icon: Icon, onClick, title, isActive = false }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-md transition-colors ${
        isActive
          ? "bg-purple-100 text-purple-700 border border-purple-200"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  const ToolbarSeparator = () => (
    <div className="w-px h-6 bg-gray-300 mx-1"></div>
  );

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-1 flex-wrap flex-shrink-0">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={FaBold}
            onClick={() => execCommand("bold")}
            title="Bold (Ctrl+B)"
            isActive={formatState.bold}
          />
          <ToolbarButton
            icon={FaItalic}
            onClick={() => execCommand("italic")}
            title="Italic (Ctrl+I)"
            isActive={formatState.italic}
          />
          <ToolbarButton
            icon={FaUnderline}
            onClick={() => execCommand("underline")}
            title="Underline (Ctrl+U)"
            isActive={formatState.underline}
          />
        </div>

        <ToolbarSeparator />

        {/* Headings */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={FaHeading}
            onClick={() => execCommand("formatBlock", "<h2>")}
            title="Heading 2"
          />
          <button
            type="button"
            onClick={() => execCommand("formatBlock", "<h3>")}
            title="Heading 3"
            className="p-2 rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <span className="text-xs font-bold">H3</span>
          </button>
        </div>

        <ToolbarSeparator />

        {/* Lists */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={FaListUl}
            onClick={() => execCommand("insertUnorderedList")}
            title="Bullet List"
          />
          <ToolbarButton
            icon={FaListOl}
            onClick={() => execCommand("insertOrderedList")}
            title="Numbered List"
          />
        </div>

        <ToolbarSeparator />

        {/* Block Quote */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={FaQuoteLeft}
            onClick={() => execCommand("formatBlock", "<blockquote>")}
            title="Block Quote"
          />
        </div>

        <ToolbarSeparator />

        {/* Image Upload */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={isUploadingImage ? FaSpinner : FaImage}
            onClick={() => fileInputRef.current?.click()}
            title="Insert Image"
            isActive={isUploadingImage}
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        <ToolbarSeparator />

        {/* Text Alignment */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={FaAlignLeft}
            onClick={() => execCommand("justifyLeft")}
            title="Align Left"
          />
          <ToolbarButton
            icon={FaAlignCenter}
            onClick={() => execCommand("justifyCenter")}
            title="Align Center"
          />
          <ToolbarButton
            icon={FaAlignRight}
            onClick={() => execCommand("justifyRight")}
            title="Align Right"
          />
          <ToolbarButton
            icon={FaAlignJustify}
            onClick={() => execCommand("justifyFull")}
            title="Justify"
          />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        dir="ltr"
        onInput={() => {
          // Only update format state on input, not content
          updateFormatState();
          saveCursorPosition();
          debouncedUpdateContent(); // Use debounced update
        }}
        onBlur={() => {
          setIsFocused(false);
          // Force immediate update when editor loses focus
          if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            onChange(content);
          }
        }}
        onPaste={handlePaste}
        onMouseUp={() => {
          updateFormatState();
          saveCursorPosition();
        }}
        onKeyUp={() => {
          updateFormatState();
          saveCursorPosition();
        }}
        onKeyDown={(e) => {
          // Save cursor position before any key operation
          saveCursorPosition();
          handleKeyDown(e);
        }}
        onFocus={() => {
          setIsFocused(true);
          updateFormatState();
          // Ensure proper text direction on focus
          if (editorRef.current) {
            editorRef.current.style.direction = "ltr";
            editorRef.current.style.textAlign = "left";
            editorRef.current.style.unicodeBidi = "normal";
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-1 p-4 focus:outline-none transition-colors ${
          isFocused ? "ring-2 ring-purple-500 ring-inset" : ""
        }`}
        style={{
          fontFamily: "inherit",
          fontSize: "inherit",
          lineHeight: "1.6",
          direction: "ltr",
          textAlign: "left",
          unicodeBidi: "normal",
        }}
        data-placeholder={placeholder}
      />

      {/* Drag & Drop Overlay */}
      <div className="hidden absolute inset-0 bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <FaUpload className="text-4xl text-purple-400 mx-auto mb-2" />
          <p className="text-purple-600 font-medium">Drop image here</p>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
