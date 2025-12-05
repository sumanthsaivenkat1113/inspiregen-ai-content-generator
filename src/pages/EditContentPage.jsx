import React, { useId, useMemo, useState, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import '../style/EditContentPage.css'

import { GripVertical, Trash2, Save, Plus, Loader2, ImagePlus } from "lucide-react";

/* ---------------------------------------------------- */
/*                SORTABLE SECTION CARD                 */
/* ---------------------------------------------------- */
const SortableItem = memo(
  ({ id, section, onChange, onDelete, onImageChange }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const handleImage = (e) => {
      const file = e.target.files?.[0];
      if (file) onImageChange(id, URL.createObjectURL(file));
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`section-card ${isDragging ? "dragging" : ""}`}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="drag-handle"
          aria-label="Drag to reorder"
        >
          <GripVertical size={20} />
        </div>

        {/* Delete */}
        <button onClick={() => onDelete(id)} className="delete-btn">
          <Trash2 size={18} />
        </button>

        {/* Image */}
        <div className="image-wrapper">
          <img
            src={section.imageUrl || "https://via.placeholder.com/800x400?text=No+Image"}
            alt={section.subheading}
          />
          <label className="image-upload-label">
            <ImagePlus size={20} />
            <input type="file" accept="image/*" onChange={handleImage} />
          </label>
        </div>

        {/* Subheading */}
        <h3
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onChange(id, "subheading", e.currentTarget.textContent ?? "")}
          className="editable-subheading"
          dangerouslySetInnerHTML={{ __html: section.subheading }}
        />

        {/* Details */}
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onChange(id, "details", e.currentTarget.textContent ?? "")}
          className="editable-details"
          dangerouslySetInnerHTML={{ __html: section.details }}
        />
      </div>
    );
  }
);
SortableItem.displayName = "SortableItem";

/* ---------------------------------------------------- */
/*                  MAIN EDITOR PAGE                    */
/* ---------------------------------------------------- */
export default function EditContentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { contentJson, headerImage } = state || {};

  const sections = useMemo(() => {
    if (!contentJson?.Content) return [];
    return contentJson.Content.map((s, i) => ({
      ...s,
      __id: s.__id ?? `sec-${i}-${Date.now()}`,
    }));
  }, [contentJson?.Content]);

  const [items, setItems] = useState(sections);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setItems((list) => {
      const oldIdx = list.findIndex((i) => i.__id === active.id);
      const newIdx = list.findIndex((i) => i.__id === over.id);
      return arrayMove(list, oldIdx, newIdx);
    });
  };

  const onChange = (id, field, value) => {
    setItems((list) =>
      list.map((s) => (s.__id === id ? { ...s, [field]: value } : s))
    );
  };

  const onDelete = (id) => setItems((list) => list.filter((s) => s.__id !== id));
  const onImageChange = (id, url) =>
    setItems((list) => list.map((s) => (s.__id === id ? { ...s, imageUrl: url } : s)));

  const addSection = () => {
    const newSec = {
      __id: `sec-${Date.now()}`,
      subheading: "New Section",
      details: "Click to edit…",
      imageUrl: "",
    };
    setItems((prev) => [...prev, newSec]);
  };

  const save = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    const clean = items.map(({ __id, ...rest }) => rest);
    navigate("/preview/content", {
      state: { contentJson: { ...contentJson, Content: clean }, headerImage },
    });
  };

  if (!contentJson) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "1.125rem", color: "#6b7280" }}>No content to edit.</p>
      </div>
    );
  }

  return (
    <div className="editor-container">
      {/* Header Image */}
      {headerImage && (
        <div className="header-image">
          <img src={headerImage} alt="Header" />
        </div>
      )}

      {/* Title */}
      <h1
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => (contentJson.Header.title = e.currentTarget.textContent ?? "")}
        className="editable-title"
        dangerouslySetInnerHTML={{ __html: contentJson.Header.title }}
      />

      {/* Intro */}
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => (contentJson.Introduction.introduction = e.currentTarget.textContent ?? "")}
        className="editable-intro"
        dangerouslySetInnerHTML={{ __html: contentJson.Introduction.introduction }}
      />

      {/* Sections */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={items.map((s) => s.__id)} strategy={verticalListSortingStrategy}>
          {items.length === 0 ? (
            <div className="empty-state">
              <p>No sections yet.</p>
              <button onClick={addSection} className="action-btn add-btn" style={{ marginTop: "1rem" }}>
                <Plus size={18} /> Add First Section
              </button>
            </div>
          ) : (
            items.map((sec) => (
              <SortableItem
                key={sec.__id}
                id={sec.__id}
                section={sec}
                onChange={onChange}
                onDelete={onDelete}
                onImageChange={onImageChange}
              />
            ))
          )}
        </SortableContext>
      </DndContext>

      {/* Action Bar */}
      <div className="action-bar">
        <button onClick={addSection} className="action-btn add-btn">
          <Plus size={18} /> Add Section
        </button>
        <button onClick={save} disabled={saving} className="action-btn save-btn">
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Save size={18} /> Save & Preview
            </>
          )}
        </button>
      </div>
    </div>
  );
}