import { Craft } from '../types/craft';

const DRAFTS_KEY = 'artconnect_drafts';
const PUBLISHED_KEY = 'artconnect_published';

export const saveDraft = (craft: Omit<Craft, 'id' | 'createdAt'>) => {
  const drafts = getDrafts();
  const newDraft: Craft = {
    ...craft,
    id: Date.now().toString(),
    createdAt: new Date(),
    isDraft: true,
    views: 0,
    likes: 0,
    shares: 0,
    comments: 0,
  };
  
  drafts.push(newDraft);
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  return newDraft;
};

export const publishCraft = (craft: Omit<Craft, 'id' | 'createdAt'>) => {
  const published = getPublishedCrafts();
  const newCraft: Craft = {
    ...craft,
    id: Date.now().toString(),
    createdAt: new Date(),
    isDraft: false,
    views: 0,
    likes: 0,
    shares: 0,
    comments: 0,
  };
  
  published.push(newCraft);
  localStorage.setItem(PUBLISHED_KEY, JSON.stringify(published));
  return newCraft;
};

export const getDrafts = (): Craft[] => {
  const drafts = localStorage.getItem(DRAFTS_KEY);
  return drafts ? JSON.parse(drafts) : [];
};

export const getPublishedCrafts = (): Craft[] => {
  const published = localStorage.getItem(PUBLISHED_KEY);
  return published ? JSON.parse(published) : [];
};

export const deleteDraft = (id: string) => {
  const drafts = getDrafts().filter(draft => draft.id !== id);
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
};

export const publishDraft = (id: string) => {
  const drafts = getDrafts();
  const draft = drafts.find(d => d.id === id);
  
  if (draft) {
    const published = getPublishedCrafts();
    const publishedCraft = { ...draft, isDraft: false };
    published.push(publishedCraft);
    localStorage.setItem(PUBLISHED_KEY, JSON.stringify(published));
    deleteDraft(id);
    return publishedCraft;
  }
  return null;
};