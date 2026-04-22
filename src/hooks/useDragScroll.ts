"use client";

import { useEffect } from "react";

/**
 * Enables click-and-drag scrolling on desktop, mimicking mobile touch behavior.
 * Attaches to the app shell and makes all scrollable containers draggable with mouse.
 */
export function useDragScroll() {
  useEffect(() => {
    // Only apply on non-touch devices (desktop)
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let scrollTarget: HTMLElement | null = null;
    let startScrollTop = 0;
    let startScrollLeft = 0;
    let moved = 0;

    // Find the nearest scrollable ancestor
    function findScrollable(el: HTMLElement | null): HTMLElement | null {
      while (el) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        const overflowX = style.overflowX;
        const isScrollable =
          (overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight;
        const isScrollableX =
          (overflowX === "auto" || overflowX === "scroll") && el.scrollWidth > el.clientWidth;
        if (isScrollable || isScrollableX) return el;
        el = el.parentElement;
      }
      return null;
    }

    function onMouseDown(e: MouseEvent) {
      // Don't interfere with interactive elements or the map (which has its own drag)
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[data-drag-scroll-ignore]") ||
        target.closest(".cursor-grab")
      ) {
        return;
      }

      const scrollable = findScrollable(target);
      if (!scrollable) return;

      dragging = true;
      moved = 0;
      startX = e.clientX;
      startY = e.clientY;
      scrollTarget = scrollable;
      startScrollTop = scrollable.scrollTop;
      startScrollLeft = scrollable.scrollLeft;

      scrollable.style.cursor = "grabbing";
      scrollable.style.userSelect = "none";
    }

    function onMouseMove(e: MouseEvent) {
      if (!dragging || !scrollTarget) return;
      e.preventDefault();

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      moved = Math.abs(dx) + Math.abs(dy);

      scrollTarget.scrollTop = startScrollTop - dy;
      scrollTarget.scrollLeft = startScrollLeft - dx;
    }

    function onMouseUp() {
      if (!dragging || !scrollTarget) return;

      scrollTarget.style.cursor = "";
      scrollTarget.style.userSelect = "";

      // If the user dragged significantly, prevent the next click from triggering links
      if (moved > 15) {
        const prevent = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
        };
        document.addEventListener("click", prevent, { capture: true, once: true });
      }

      dragging = false;
      scrollTarget = null;
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
}
