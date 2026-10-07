import { useState, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PanelBody, Button, Tooltip } from "@wordpress/components";
import "./ItemsPanel.scss";

/**
 * Advanced Modern ItemsPanel Component
 * Provides a state-of-the-art UI for managing list items across Gutenberg blocks.
 *
 * @param {Object} props
 * @param {string} [props.title] - The title shown at the top of the panel. (প্যানেলের উপরে দেখানো মেইন টাইটেল)
 * @param {boolean} [props.initialOpen] - Whether the panel is open by default. (প্যানেলটি শুরুতে খোলা থাকবে কি না)
 * @param {Array} [props.items] - The array of items to manage. (যে আইটেমগুলো ম্যানেজ করতে চান তার অ্যারে)
 * @param {Function} props.onChange - Callback function triggered when items are added, removed, or updated. (আইটেম অ্যাড, রিমুভ বা এডিট হলে এই ফাংশন কল হয়)
 * @param {Object} [props.defaultItem] - The default structure of a new item when clicking the add button. (নতুন আইটেম অ্যাড করলে তার ডিফল্ট স্ট্রাকচার বা ভ্যালু কেমন হবে)
 * @param {string} [props.addButtonLabel] - The label text for the add button. (নতুন আইটেম অ্যাড করার বাটনের টেক্সট)
 * @param {string} [props.itemTitleKey] - The object key used to display the item's title in the list header. (লিস্টের হেডিংয়ে আইটেমের কোন প্রোপার্টিটি দেখাবে, যেমন: 'name' বা 'title')
 * @param {Function} [props.ItemSettings] - React Component to render the fields. Receives `{item, index, updateField}` as props. (কাস্টম কম্পোনেন্ট হিসেবে ফিল্ড রেন্ডার করার জন্য)
 */
const ItemsPanel = (data) => {
  const {
    title = __("Items Manager", "guten-builder-blocks"),
    initialOpen = true,
    items = [],
    onChange,
    defaultItem = {},
    addButtonLabel = __("＋ Add New Item", "guten-builder-blocks"),
    itemTitleKey = "title",
    ItemSettings,
  } = data;

  const [openItemIndex, setOpenItemIndex] = useState(null);

  // Drag and Drop refs
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const triggerChange = (newItems) => {
    if (typeof onChange === "function") {
      onChange(newItems);
    }
  };

  // Drag Handlers
  const handleDragStart = (e, index) => {
    dragItem.current = index;
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
      if (e.target) e.target.classList.add("tr-is-dragging");
    }, 0);
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    if (e.target) e.target.classList.remove("tr-is-dragging");

    if (
      dragItem.current !== null &&
      dragOverItem.current !== null &&
      dragItem.current !== dragOverItem.current
    ) {
      const newItems = [...items];
      const draggedItemContent = newItems.splice(dragItem.current, 1)[0];
      newItems.splice(dragOverItem.current, 0, draggedItemContent);
      triggerChange(newItems);
      setOpenItemIndex(null); // Close item to avoid layout glitches after moving
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // Add Item
  const handleAddItem = () => {
    const newItems = [...items, { ...defaultItem }];
    triggerChange(newItems);
    setOpenItemIndex(newItems.length - 1);
  };

  // Delete Item
  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    triggerChange(newItems);
    if (openItemIndex === index) {
      setOpenItemIndex(null);
    } else if (openItemIndex > index) {
      setOpenItemIndex(openItemIndex - 1);
    }
  };

  // Duplicate Item
  const handleDuplicateItem = (index) => {
    const newItems = [...items];
    const duplicatedItem = JSON.parse(JSON.stringify(newItems[index]));
    newItems.splice(index + 1, 0, duplicatedItem);
    triggerChange(newItems);
    setOpenItemIndex(index + 1);
  };

  // Update Item Field
  const handleUpdateField = (index, key, value) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [key]: value,
    };
    triggerChange(newItems);
  };

  return (
    <PanelBody
      title={title}
      initialOpen={initialOpen}
      className="tr-items-panel-container bPlPanelBody"
    >
      {items.length === 0 ? (
        <div className="tr-items-panel-empty">
          <div className="tr-items-panel-empty-icon">📦</div>
          <p className="tr-items-panel-empty-text">
            {__("No items created yet.", "guten-builder-blocks")}
          </p>
        </div>
      ) : (
        items.map((item, index) => {
          const isOpen = openItemIndex === index;
          const rawTitle =
            item[itemTitleKey] || item.title || item.question || "";
          const displayTitle =
            rawTitle.trim() !== ""
              ? rawTitle
              : `${__("Item", "guten-builder-blocks")} ${index + 1}`;

          return (
            <div
              key={index}
              className={`tr-items-panel-card ${isOpen ? "is-open" : ""}`}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              {/* Item Header Bar */}
              <div
                className="tr-items-panel-header"
                onClick={() => setOpenItemIndex(isOpen ? null : index)}
              >
                {/* Left: Title */}
                <div className="tr-items-panel-title-wrapper">
                  <span className="tr-items-panel-title">{displayTitle}</span>
                </div>

                {/* Right: Action Toolbar */}
                <div
                  className="tr-items-panel-toolbar"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Drag Handle */}
                  <Tooltip text={__("Drag to reorder", "guten-builder-blocks")}>
                    <span
                      className="tr-items-panel-drag-handle"
                      style={{
                        cursor: "grab",
                        padding: "4px",
                        color: "#64748b",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="5 9 2 12 5 15"></polyline>
                        <polyline points="9 5 12 2 15 5"></polyline>
                        <polyline points="19 9 22 12 19 15"></polyline>
                        <polyline points="9 19 12 22 15 19"></polyline>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <line x1="12" y1="2" x2="12" y2="22"></line>
                      </svg>
                    </span>
                  </Tooltip>

                  {/* Duplicate */}
                  <Tooltip text={__("Duplicate", "guten-builder-blocks")}>
                    <Button
                      className="tr-items-panel-btn"
                      icon="admin-page"
                      onClick={() => handleDuplicateItem(index)}
                    />
                  </Tooltip>

                  {/* Remove */}
                  <Tooltip text={__("Delete", "guten-builder-blocks")}>
                    <Button
                      className="tr-items-panel-btn tr-items-panel-btn-delete"
                      icon="no-alt"
                      isDestructive
                      onClick={() => handleDeleteItem(index)}
                    />
                  </Tooltip>
                </div>
              </div>

              {/* Item Fields Body */}
              {isOpen && (
                <div className="tr-items-panel-body">
                  {ItemSettings ? (
                    <ItemSettings
                      item={item}
                      index={index}
                      updateField={(key, val) =>
                        handleUpdateField(index, key, val)
                      }
                    />
                  ) : null}
                </div>
              )}
            </div>
          );
        })
      )}

      {/* Modern Add Button with Default Plus Icon */}
      <Button
        className="tr-items-panel-add-btn"
        variant="primary"
        icon="plus"
        onClick={handleAddItem}
      >
        {typeof addButtonLabel === "string"
          ? addButtonLabel.replace(/^[＋+]\s*/, "")
          : addButtonLabel}
      </Button>
    </PanelBody>
  );
};

export default ItemsPanel;
