import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  Button,
  TextControl,
  TextareaControl,
  ToggleControl,
  SelectControl,
  Tooltip,
} from "@wordpress/components";
import "./ItemsPanel.scss";

/**
 * Advanced Modern ItemsPanel Component
 * Provides a state-of-the-art UI for managing list items across Gutenberg blocks.
 */
const ItemsPanel = ({
  title = __("📋 Items Manager", "guten-builder-blocks"),
  initialOpen = true,
  items = [],
  onChange,
  defaultItem = {},
  addButtonLabel = __("＋ Add New Item", "guten-builder-blocks"),
  itemTitleKey = "title",
  fields = [],
  renderItemFields,
}) => {
  const [openItemIndex, setOpenItemIndex] = useState(null);

  const triggerChange = (newItems) => {
    if (typeof onChange === "function") {
      onChange(newItems);
    }
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

  // Move Item (Reorder)
  const handleMoveItem = (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    triggerChange(newItems);
    setOpenItemIndex(targetIndex);
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
              : `${__("Item", "guten-builder-blocks")} #${index + 1}`;

          return (
            <div
              key={index}
              className={`tr-items-panel-card ${isOpen ? "is-open" : ""}`}
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
                  {/* Move Up */}
                  <Tooltip text={__("Move Up", "guten-builder-blocks")}>
                    <Button
                      className="tr-items-panel-btn"
                      icon="arrow-up-alt2"
                      disabled={index === 0}
                      onClick={() => handleMoveItem(index, "up")}
                    />
                  </Tooltip>

                  {/* Move Down */}
                  <Tooltip text={__("Move Down", "guten-builder-blocks")}>
                    <Button
                      className="tr-items-panel-btn"
                      icon="arrow-down-alt2"
                      disabled={index === items.length - 1}
                      onClick={() => handleMoveItem(index, "down")}
                    />
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
                  {typeof renderItemFields === "function"
                    ? renderItemFields(item, index, (key, val) =>
                        handleUpdateField(index, key, val),
                      )
                    : fields.map((fieldConfig) => {
                        const {
                          key,
                          label,
                          type = "text",
                          options,
                          rows = 3,
                          help,
                        } = fieldConfig;
                        const fieldValue =
                          item[key] !== undefined ? item[key] : "";

                        if (type === "textarea") {
                          return (
                            <TextareaControl
                              key={key}
                              label={label}
                              value={fieldValue}
                              onChange={(val) =>
                                handleUpdateField(index, key, val)
                              }
                              rows={rows}
                              help={help}
                            />
                          );
                        }

                        if (type === "toggle") {
                          return (
                            <ToggleControl
                              key={key}
                              label={label}
                              checked={Boolean(fieldValue)}
                              onChange={(val) =>
                                handleUpdateField(index, key, val)
                              }
                              help={help}
                            />
                          );
                        }

                        if (type === "select") {
                          return (
                            <SelectControl
                              key={key}
                              label={label}
                              value={fieldValue}
                              options={options || []}
                              onChange={(val) =>
                                handleUpdateField(index, key, val)
                              }
                              help={help}
                            />
                          );
                        }

                        // Default text input
                        return (
                          <TextControl
                            key={key}
                            label={label}
                            value={fieldValue}
                            onChange={(val) =>
                              handleUpdateField(index, key, val)
                            }
                            help={help}
                          />
                        );
                      })}
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
