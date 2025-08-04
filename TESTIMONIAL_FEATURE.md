# Testimonial Feature Implementation

## Overview

This feature allows patients to write and post reviews/testimonials about their experience with Mood Mantra. The system includes a moderation workflow where admins can approve or reject testimonials before they are published.

## Features

### For Patients/Users:

1. **Share Your Story Button**: Click to open a modal for writing testimonials
2. **Testimonial Form**:
   - Rate experience (1-5 stars)
   - Enter name (or submit anonymously)
   - Select role (Patient, Family Member, Caregiver, etc.)
   - Write testimonial (max 500 characters)
3. **Manage Existing Testimonials**: Edit or delete their own testimonials
4. **Status Tracking**: See if their testimonial is published or under review

### For Admins:

1. **Testimonials Management Page**: View all testimonials with filtering options
2. **Moderation Tools**: Approve, reject, or delete testimonials
3. **Detailed View**: See full testimonial details including user information
4. **Filter Options**: View all, pending, or approved testimonials

## Backend Implementation

### Models

- `testimonialModel.js`: Defines testimonial schema with fields for user, content, rating, approval status, etc.

### Controllers

- `testimonialController.js`: Handles CRUD operations for testimonials
- Includes validation, user authentication, and moderation logic

### Routes

- `testimonialRoute.js`: API endpoints for testimonial operations
- Public routes for viewing approved testimonials
- Protected routes for creating/updating testimonials
- Admin routes for moderation

## Frontend Implementation

### Components

- `Testimonial.jsx`: Main testimonials display component (updated)
- `TestimonialModal.jsx`: Modal for writing/editing testimonials
- `Testimonials.jsx`: Admin page for managing testimonials

### Services

- `testimonialService.js`: API service functions for testimonial operations

## API Endpoints

### Public

- `GET /api/testimonials/approved` - Get all approved testimonials

### User (Authenticated)

- `POST /api/testimonials` - Create new testimonial
- `GET /api/testimonials/user/:userId` - Get user's testimonial
- `PUT /api/testimonials/:testimonialId` - Update testimonial
- `DELETE /api/testimonials/:testimonialId` - Delete testimonial

### Admin (Authenticated)

- `GET /api/testimonials/all` - Get all testimonials
- `PUT /api/testimonials/:testimonialId/status` - Approve/reject testimonial

## Usage

### For Patients:

1. Navigate to the testimonials section on the website
2. Click "Share Your Story" button
3. Fill out the testimonial form
4. Submit for review
5. Check status and manage existing testimonials

### For Admins:

1. Login to admin panel
2. Navigate to "Testimonials" in the sidebar
3. Review pending testimonials
4. Approve or reject testimonials
5. Manage all testimonials with filtering options

## Security Features

- User authentication required for creating/editing testimonials
- Users can only edit/delete their own testimonials
- Admin authentication required for moderation
- Input validation and sanitization
- Rate limiting (one testimonial per user)

## Dependencies Added

- `framer-motion`: For smooth animations in the modal and components

## Installation

1. Install new dependencies: `npm install framer-motion`
2. Restart the backend server to load new routes
3. The feature is ready to use!

## Notes

- Testimonials require admin approval before being published
- Users can submit anonymously if they prefer
- The system prevents duplicate testimonials from the same user
- All testimonials are stored with user association for moderation purposes
