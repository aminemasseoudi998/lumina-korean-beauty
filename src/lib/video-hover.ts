let activeSlug: string | null = null;
const listeners = new Set<(slug: string | null) => void>();

export function getActiveVideoSlug(): string | null {
  return activeSlug;
}

export function setActiveVideoSlug(slug: string): void {
  if (activeSlug !== slug) {
    activeSlug = slug;
    listeners.forEach((l) => l(slug));
  }
}

export function clearActiveVideoSlug(owner: string): void {
  if (activeSlug === owner) {
    activeSlug = null;
    listeners.forEach((l) => l(null));
  }
}

export function subscribeActiveVideo(
  listener: (slug: string | null) => void,
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
