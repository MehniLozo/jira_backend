import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
      currentUser: Record<string, any>;
    }
  }
}
