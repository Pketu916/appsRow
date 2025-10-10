# Rajkamal Deals API Documentation

## Overview

Complete CRUD operations API for travel deals management with image upload support.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently all endpoints are public. Authentication can be added later.

## Endpoints

### 1. Get All Deals

**GET** `/deals`

#### Query Parameters

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `category` (optional): Filter by category
- `country` (optional): Filter by country
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `q` (optional): Search query
- `sortBy` (optional): Sort by field (price_asc, price_desc, rating, newest, oldest)

#### Example Request

```bash
GET /api/deals?page=1&limit=10&category=Honeymoon%20trip&sortBy=price_asc
```

#### Example Response

```json
{
  "success": true,
  "count": 3,
  "total": 3,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Explore France's timeless scenic routes",
      "country": "France",
      "duration": "8 Nights - 9 Days",
      "rating": 5.0,
      "reviews": 325,
      "offer": "10% off",
      "category": "Honeymoon trip",
      "price": 180.0,
      "oldPrice": 200.0,
      "currency": "USD",
      "description": "Experience the romantic charm of France...",
      "highlights": ["Eiffel Tower visit", "Louvre Museum tour"],
      "inclusions": ["Accommodation", "Breakfast"],
      "exclusions": ["International flights", "Lunch and dinner"],
      "bigImage": "/uploads/deals/bigImage-1234567890.jpg",
      "bigImageUrl": "http://localhost:5000/uploads/deals/bigImage-1234567890.jpg",
      "image": "/uploads/deals/image-1234567890.jpg",
      "imageUrl": "http://localhost:5000/uploads/deals/image-1234567890.jpg",
      "additionalImages": ["/uploads/deals/additional/image1.jpg"],
      "additionalImageUrls": [
        "http://localhost:5000/uploads/deals/additional/image1.jpg"
      ],
      "isActive": true,
      "isFeatured": true,
      "maxGuests": 4,
      "minGuests": 2,
      "tags": ["romantic", "luxury", "culture"],
      "discountPercentage": 10,
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    }
  ]
}
```

### 2. Get Single Deal

**GET** `/deals/:id`

#### Example Request

```bash
GET /api/deals/64f8a1b2c3d4e5f6a7b8c9d0
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Explore France's timeless scenic routes",
    "country": "France",
    "duration": "8 Nights - 9 Days",
    "rating": 5.0,
    "reviews": 325,
    "offer": "10% off",
    "category": "Honeymoon trip",
    "price": 180.0,
    "oldPrice": 200.0,
    "currency": "USD",
    "description": "Experience the romantic charm of France...",
    "highlights": ["Eiffel Tower visit", "Louvre Museum tour"],
    "inclusions": ["Accommodation", "Breakfast"],
    "exclusions": ["International flights", "Lunch and dinner"],
    "bigImage": "/uploads/deals/bigImage-1234567890.jpg",
    "bigImageUrl": "http://localhost:5000/uploads/deals/bigImage-1234567890.jpg",
    "image": "/uploads/deals/image-1234567890.jpg",
    "imageUrl": "http://localhost:5000/uploads/deals/image-1234567890.jpg",
    "additionalImages": ["/uploads/deals/additional/image1.jpg"],
    "additionalImageUrls": [
      "http://localhost:5000/uploads/deals/additional/image1.jpg"
    ],
    "isActive": true,
    "isFeatured": true,
    "maxGuests": 4,
    "minGuests": 2,
    "tags": ["romantic", "luxury", "culture"],
    "discountPercentage": 10,
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

### 3. Create New Deal

**POST** `/deals`

#### Content-Type

`multipart/form-data` (for file uploads)

#### Form Fields

- `title` (required): Deal title
- `country` (required): Country name
- `duration` (required): Trip duration
- `rating` (required): Rating (0-5)
- `reviews` (required): Number of reviews
- `category` (required): Trip category
- `price` (required): Current price
- `oldPrice` (optional): Original price
- `currency` (optional): Currency (default: USD)
- `description` (optional): Deal description
- `highlights` (optional): Array of highlights
- `inclusions` (optional): Array of inclusions
- `exclusions` (optional): Array of exclusions
- `bigImage` (required): Main image file
- `image` (required): Thumbnail image file
- `additionalImages` (optional): Additional image files (max 5)
- `isActive` (optional): Active status (default: true)
- `isFeatured` (optional): Featured status (default: false)
- `maxGuests` (optional): Maximum guests (default: 10)
- `minGuests` (optional): Minimum guests (default: 1)
- `tags` (optional): Array of tags

#### Example Request

```bash
curl -X POST http://localhost:5000/api/deals \
  -F "title=Amazing Thailand Trip" \
  -F "country=Thailand" \
  -F "duration=7 Nights - 8 Days" \
  -F "rating=4.5" \
  -F "reviews=150" \
  -F "category=Family trip" \
  -F "price=299.99" \
  -F "oldPrice=399.99" \
  -F "currency=USD" \
  -F "description=Explore beautiful Thailand" \
  -F "bigImage=@/path/to/main-image.jpg" \
  -F "image=@/path/to/thumbnail.jpg" \
  -F "additionalImages=@/path/to/gallery1.jpg" \
  -F "additionalImages=@/path/to/gallery2.jpg"
```

#### Example Response

```json
{
  "success": true,
  "message": "Deal created successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "title": "Amazing Thailand Trip",
    "country": "Thailand",
    "duration": "7 Nights - 8 Days",
    "rating": 4.5,
    "reviews": 150,
    "category": "Family trip",
    "price": 299.99,
    "oldPrice": 399.99,
    "currency": "USD",
    "description": "Explore beautiful Thailand",
    "bigImage": "/uploads/deals/bigImage-1234567891.jpg",
    "bigImageUrl": "http://localhost:5000/uploads/deals/bigImage-1234567891.jpg",
    "image": "/uploads/deals/image-1234567891.jpg",
    "imageUrl": "http://localhost:5000/uploads/deals/image-1234567891.jpg",
    "additionalImages": [
      "/uploads/deals/additional/additionalImages-1234567891.jpg",
      "/uploads/deals/additional/additionalImages-1234567892.jpg"
    ],
    "additionalImageUrls": [
      "http://localhost:5000/uploads/deals/additional/additionalImages-1234567891.jpg",
      "http://localhost:5000/uploads/deals/additional/additionalImages-1234567892.jpg"
    ],
    "isActive": true,
    "isFeatured": false,
    "maxGuests": 10,
    "minGuests": 1,
    "tags": [],
    "discountPercentage": 25,
    "createdAt": "2023-09-06T10:35:00.000Z",
    "updatedAt": "2023-09-06T10:35:00.000Z"
  }
}
```

### 4. Update Deal

**PUT** `/deals/:id`

#### Content-Type

`multipart/form-data` (for file uploads)

#### Form Fields

Same as create deal, all fields are optional for updates.

#### Example Request

```bash
curl -X PUT http://localhost:5000/api/deals/64f8a1b2c3d4e5f6a7b8c9d1 \
  -F "title=Updated Thailand Trip" \
  -F "price=279.99" \
  -F "isFeatured=true"
```

#### Example Response

```json
{
  "success": true,
  "message": "Deal updated successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "title": "Updated Thailand Trip",
    "country": "Thailand",
    "duration": "7 Nights - 8 Days",
    "rating": 4.5,
    "reviews": 150,
    "category": "Family trip",
    "price": 279.99,
    "oldPrice": 399.99,
    "currency": "USD",
    "description": "Explore beautiful Thailand",
    "isActive": true,
    "isFeatured": true,
    "maxGuests": 10,
    "minGuests": 1,
    "tags": [],
    "discountPercentage": 30,
    "createdAt": "2023-09-06T10:35:00.000Z",
    "updatedAt": "2023-09-06T10:40:00.000Z"
  }
}
```

### 5. Delete Deal

**DELETE** `/deals/:id`

#### Example Request

```bash
curl -X DELETE http://localhost:5000/api/deals/64f8a1b2c3d4e5f6a7b8c9d1
```

#### Example Response

```json
{
  "success": true,
  "message": "Deal deleted successfully"
}
```

### 6. Get Featured Deals

**GET** `/deals/featured`

#### Query Parameters

- `limit` (optional): Number of featured deals (default: 6)

#### Example Request

```bash
GET /api/deals/featured?limit=3
```

#### Example Response

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Explore France's timeless scenic routes",
      "country": "France",
      "duration": "8 Nights - 9 Days",
      "rating": 5.0,
      "reviews": 325,
      "offer": "10% off",
      "category": "Honeymoon trip",
      "price": 180.0,
      "oldPrice": 200.0,
      "currency": "USD",
      "isActive": true,
      "isFeatured": true,
      "bigImageUrl": "http://localhost:5000/uploads/deals/bigImage-1234567890.jpg",
      "imageUrl": "http://localhost:5000/uploads/deals/image-1234567890.jpg",
      "discountPercentage": 10
    }
  ]
}
```

### 7. Get Deals by Category

**GET** `/deals/category/:category`

#### Path Parameters

- `category`: Category name (Honeymoon trip, Family trip, Adventure trip, Business trip, Solo trip, Group trip)

#### Query Parameters

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

#### Example Request

```bash
GET /api/deals/category/Honeymoon%20trip?page=1&limit=5
```

#### Example Response

```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Explore France's timeless scenic routes",
      "country": "France",
      "duration": "8 Nights - 9 Days",
      "rating": 5.0,
      "reviews": 325,
      "offer": "10% off",
      "category": "Honeymoon trip",
      "price": 180.0,
      "oldPrice": 200.0,
      "currency": "USD",
      "isActive": true,
      "isFeatured": true,
      "bigImageUrl": "http://localhost:5000/uploads/deals/bigImage-1234567890.jpg",
      "imageUrl": "http://localhost:5000/uploads/deals/image-1234567890.jpg",
      "discountPercentage": 10
    }
  ]
}
```

## Error Responses

### Validation Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required",
      "value": ""
    }
  ]
}
```

### Not Found Error

```json
{
  "success": false,
  "message": "Deal not found"
}
```

### Server Error

```json
{
  "success": false,
  "message": "Error creating deal",
  "error": "Detailed error message"
}
```

## File Upload Specifications

### Supported File Types

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### File Size Limits

- Maximum file size: 5MB per file
- Maximum files per request: 10 files

### File Storage

- Files are stored in `/uploads/deals/` directory
- Main images: `/uploads/deals/`
- Additional images: `/uploads/deals/additional/`
- Files are accessible via URL: `http://localhost:5000/uploads/deals/filename.jpg`

## Categories

- Honeymoon trip
- Family trip
- Adventure trip
- Business trip
- Solo trip
- Group trip

## Currencies

- USD (default)
- INR
- EUR
- GBP

## Testing the API

### Using curl

```bash
# Get all deals
curl http://localhost:5000/api/deals

# Get single deal
curl http://localhost:5000/api/deals/DEAL_ID

# Create deal with files
curl -X POST http://localhost:5000/api/deals \
  -F "title=Test Deal" \
  -F "country=India" \
  -F "duration=5 Days" \
  -F "rating=4.0" \
  -F "reviews=100" \
  -F "category=Family trip" \
  -F "price=199.99" \
  -F "bigImage=@/path/to/image.jpg" \
  -F "image=@/path/to/thumb.jpg"

# Update deal
curl -X PUT http://localhost:5000/api/deals/DEAL_ID \
  -F "price=179.99"

# Delete deal
curl -X DELETE http://localhost:5000/api/deals/DEAL_ID
```

### Using Postman

1. Import the API collection
2. Set base URL to `http://localhost:5000/api`
3. Use form-data for file uploads
4. Test all CRUD operations

## Health Check

**GET** `/health`

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2023-09-06T10:30:00.000Z",
  "environment": "development"
}
```
