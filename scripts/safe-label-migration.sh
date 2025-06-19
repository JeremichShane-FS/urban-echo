#!/bin/bash

# Safe GitHub Label Migration Script
# This script migrates existing labels while preserving issue assignments

echo "🏷️ Safe label migration for Urban Echo..."

# Step 1: Backup current issues and labels
echo "📋 Creating backup of current issue labels..."
gh issue list --state all --json number,title,labels --jq '.[] | {number: .number, title: .title, labels: (.labels | map(.name))}' > issue-labels-backup.json
echo "✅ Backup saved to issue-labels-backup.json"

# Step 2: Create new labels WITHOUT deleting old ones yet
echo "🆕 Creating new professional labels..."

# TYPE LABELS
gh label create "type: bug" --description "Something isn't working correctly" --color "d73a4a" 2>/dev/null || echo "Label already exists: type: bug"
gh label create "type: enhancement" --description "New feature or request" --color "a2eeef" 2>/dev/null || echo "Label already exists: type: enhancement"
gh label create "type: documentation" --description "Improvements or additions to documentation" --color "0075ca" 2>/dev/null || echo "Label already exists: type: documentation"

# PRIORITY LABELS  
gh label create "priority: critical" --description "Requires immediate attention (production down)" --color "b60205" 2>/dev/null || echo "Label already exists: priority: critical"
gh label create "priority: high" --description "Requires immediate attention" --color "d93f0b" 2>/dev/null || echo "Label already exists: priority: high"
gh label create "priority: medium" --description "Requires semi-immediate attention" --color "fbca04" 2>/dev/null || echo "Label already exists: priority: medium"
gh label create "priority: low" --description "Does not require immediate attention" --color "0e8a16" 2>/dev/null || echo "Label already exists: priority: low"

# AREA LABELS
gh label create "area: frontend" --description "Issues related to UI/UX and client-side code" --color "1d76db" 2>/dev/null || echo "Label already exists: area: frontend"
gh label create "area: backend" --description "Issues related to server-side logic and APIs" --color "0e4b99" 2>/dev/null || echo "Label already exists: area: backend"
gh label create "area: database" --description "Database-specific issues and queries" --color "5319e7" 2>/dev/null || echo "Label already exists: area: database"
gh label create "area: api" --description "API endpoint and integration issues" --color "2e7d32" 2>/dev/null || echo "Label already exists: area: api"
gh label create "area: payment" --description "Payment processing and Stripe integration" --color "1b5e20" 2>/dev/null || echo "Label already exists: area: payment"
gh label create "area: security" --description "Security-related concerns and vulnerabilities" --color "d93f0b" 2>/dev/null || echo "Label already exists: area: security"

# STATUS LABELS
gh label create "status: in-progress" --description "Currently being worked on" --color "0052cc" 2>/dev/null || echo "Label already exists: status: in-progress"
gh label create "status: needs-review" --description "Ready for code review or testing" --color "0e8a16" 2>/dev/null || echo "Label already exists: status: needs-review"

# AUTOMATION LABELS
gh label create "auto-generated" --description "Issues created by automation" --color "f1c40f" 2>/dev/null || echo "Label already exists: auto-generated"
gh label create "tech-debt" --description "Technical debt that needs addressing" --color "6c757d" 2>/dev/null || echo "Label already exists: tech-debt"

# TECH SPECIFIC
gh label create "mongodb" --description "MongoDB database specific issues" --color "4db33d" 2>/dev/null || echo "Label already exists: mongodb"
gh label create "stripe" --description "Stripe payment integration issues" --color "635bff" 2>/dev/null || echo "Label already exists: stripe"
gh label create "auth0" --description "Authentication and user management" --color "eb5424" 2>/dev/null || echo "Label already exists: auth0"
gh label create "nextjs" --description "Next.js framework specific issues" --color "000000" 2>/dev/null || echo "Label already exists: nextjs"

echo "✅ New labels created!"

# Step 3: Create migration mapping
echo "🔄 Label migration mapping:"
echo "bug → type: bug"
echo "enhancement → type: enhancement" 
echo "documentation → type: documentation"
echo "high priority → priority: high"
echo "medium priority → priority: medium"
echo "low priority → priority: low"
echo "frontend → area: frontend"
echo "backend → area: backend"

# Step 4: Migration script for existing issues
echo ""
echo "🔧 Generating migration commands..."
echo "#!/bin/bash" > migrate-issue-labels.sh
echo "# Auto-generated migration script" >> migrate-issue-labels.sh
echo "" >> migrate-issue-labels.sh

# Get all issues and create migration commands
gh issue list --state all --json number,labels | jq -r '.[] | 
  select(.labels | length > 0) | 
  .number as $num | 
  .labels[] | 
  select(.name | test("^(bug|enhancement|documentation|high priority|medium priority|low priority|frontend|backend)$")) |
  "gh issue edit \($num) --remove-label \"\(.name)\" --add-label \"" + 
  (if .name == "bug" then "type: bug"
   elif .name == "enhancement" then "type: enhancement"
   elif .name == "documentation" then "type: documentation"
   elif .name == "high priority" then "priority: high"
   elif .name == "medium priority" then "priority: medium"
   elif .name == "low priority" then "priority: low"
   elif .name == "frontend" then "area: frontend"
   elif .name == "backend" then "area: backend"
   else .name end) + "\""' >> migrate-issue-labels.sh

chmod +x migrate-issue-labels.sh

echo "✅ Migration script created: migrate-issue-labels.sh"
echo ""
echo "🎯 Next steps:"
echo "1. Review the migration script: cat migrate-issue-labels.sh"
echo "2. Run the migration: ./migrate-issue-labels.sh"
echo "3. Clean up old labels: gh label delete 'bug' --yes"
echo ""
echo "📋 Your issues will keep all their labels during this process!"