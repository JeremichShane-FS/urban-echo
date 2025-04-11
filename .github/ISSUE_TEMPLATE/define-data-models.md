---
name: 📊 Define Data Models
about: Focus on defining and documenting data models for the application
title: "Model: [Model Name]"
labels: model, data
assignees: ""
---

## 📊 Model: [Model Name]

### 📋 Properties/Fields

| Field | Type   | Description                          |
| ----- | ------ | ------------------------------------ |
| title | string | Title of the article (max 100 chars) |

<!-- Examples:
| content | text | Main content of the article |
| publishedAt | datetime | When the article was published |
| authorId | integer | Foreign key to User model | -->

### ✅ Validations

| Field | Rules                                          |
| ----- | ---------------------------------------------- |
| title | Required, min length 5, max length 100, unique |

<!-- Examples:
| content | Required, min length 50 |
| publishedAt | Required for published status |
| authorId | Required, must exist in Users table | -->

### 🔗 Relationships

| Type       | Related Model | Description                             |
| ---------- | ------------- | --------------------------------------- |
| Belongs to | User          | Each article belongs to a single author |

<!-- Examples:
| Has many | Comment | An article can have multiple comments |
| Has many | Tag | Through ArticleTags join table | -->

### ⚙️ Business Logic

<!-- Examples:
- [ ] Articles cannot be published without an author
- [ ] Draft articles should not appear in public listings
- [ ] When archived, all associated comments should be hidden -->

- [ ]
- [ ]
- [ ]

### 📝 Additional Notes

<!-- Example: This model will need appropriate indexes for performance. Consider implementing soft delete functionality. -->

**🔗 Related Models:** #
