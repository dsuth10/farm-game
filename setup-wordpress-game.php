<?php
/**
 * WordPress Game Setup Script
 * 
 * This script helps organize your sheep game files for WordPress installation.
 * Run this script from your game directory to prepare files for WordPress.
 */

// Configuration
$sourceDir = __DIR__;
$wordpressDir = $sourceDir . '/wordpress-ready';
$themeDir = $wordpressDir . '/sheep-game-theme';

// Create directory structure
$directories = [
    $wordpressDir,
    $themeDir,
    $themeDir . '/sheep-game',
    $themeDir . '/sheep-game/css',
    $themeDir . '/sheep-game/js'
];

echo "🚀 Setting up WordPress game files...\n\n";

// Create directories
foreach ($directories as $dir) {
    if (!file_exists($dir)) {
        if (mkdir($dir, 0755, true)) {
            echo "✅ Created directory: $dir\n";
        } else {
            echo "❌ Failed to create directory: $dir\n";
            exit(1);
        }
    }
}

// Copy CSS files
$cssFiles = [
    'css/main.css' => $themeDir . '/sheep-game/css/main.css',
    'css/responsive.css' => $themeDir . '/sheep-game/css/responsive.css'
];

foreach ($cssFiles as $source => $dest) {
    if (file_exists($source)) {
        if (copy($source, $dest)) {
            echo "✅ Copied: $source → $dest\n";
        } else {
            echo "❌ Failed to copy: $source\n";
        }
    } else {
        echo "⚠️  Source file not found: $source\n";
    }
}

// Copy JavaScript files
$jsFiles = [
    'js/game.js' => $themeDir . '/sheep-game/js/game.js',
    'js/calculations.js' => $themeDir . '/sheep-game/js/calculations.js',
    'js/validation.js' => $themeDir . '/sheep-game/js/validation.js',
    'js/pdf-export.js' => $themeDir . '/sheep-game/js/pdf-export.js'
];

foreach ($jsFiles as $source => $dest) {
    if (file_exists($source)) {
        if (copy($source, $dest)) {
            echo "✅ Copied: $source → $dest\n";
        } else {
            echo "❌ Failed to copy: $source\n";
        }
    } else {
        echo "⚠️  Source file not found: $source\n";
    }
}

// Copy template files
$templateFiles = [
    'page-sheep-game.php' => $themeDir . '/page-sheep-game.php',
    'sheep-game-modals.php' => $themeDir . '/sheep-game-modals.php'
];

foreach ($templateFiles as $source => $dest) {
    if (file_exists($source)) {
        if (copy($source, $dest)) {
            echo "✅ Copied: $source → $dest\n";
        } else {
            echo "❌ Failed to copy: $source\n";
        }
    } else {
        echo "⚠️  Source file not found: $source\n";
    }
}

// Create README for WordPress installation
$readmeContent = "# WordPress Game Installation

## Files Ready for Upload

Your game files have been organized for WordPress installation. Here's what you need to do:

### 1. Upload to WordPress Theme Directory

Upload the following files to your WordPress theme directory:

**Template Files:**
- `page-sheep-game.php` → Upload to your theme root directory
- `sheep-game-modals.php` → Upload to your theme root directory

**Game Assets:**
- `sheep-game/` folder → Upload to your theme root directory

### 2. Create WordPress Page

1. Log into WordPress admin
2. Go to Pages → Add New
3. Set title: \"Sheep Station Manager Game\"
4. In Page Attributes → Template: Select \"Sheep Station Manager Game\"
5. Publish the page

### 3. Test the Game

Visit your new page to ensure everything works correctly.

## File Structure

```
your-wordpress-theme/
├── page-sheep-game.php          (Custom page template)
├── sheep-game-modals.php         (Modal dialogs)
└── sheep-game/                   (Game assets)
    ├── css/
    │   ├── main.css
    │   └── responsive.css
    └── js/
        ├── game.js
        ├── calculations.js
        ├── validation.js
        └── pdf-export.js
```

## Troubleshooting

- Ensure all files have proper permissions (644 for files, 755 for directories)
- Check browser console for JavaScript errors
- Verify file paths in the template match your theme structure

For detailed instructions, see: WORDPRESS_INSTALLATION_GUIDE.md
";

file_put_contents($wordpressDir . '/README.md', $readmeContent);
echo "✅ Created: README.md with installation instructions\n";

// Create installation checklist
$checklistContent = "# WordPress Installation Checklist

## Pre-Installation
- [ ] Backup your WordPress site
- [ ] Ensure you have FTP access to your theme directory
- [ ] Verify your theme supports custom page templates

## File Upload
- [ ] Upload `page-sheep-game.php` to theme root
- [ ] Upload `sheep-game-modals.php` to theme root
- [ ] Upload `sheep-game/` folder to theme root
- [ ] Verify all file permissions (644 for files, 755 for directories)

## WordPress Configuration
- [ ] Create new page in WordPress admin
- [ ] Set page template to \"Sheep Station Manager Game\"
- [ ] Publish the page
- [ ] Test game functionality

## Post-Installation Testing
- [ ] Game loads without errors
- [ ] All buttons and interactions work
- [ ] Mobile responsiveness works
- [ ] Modals open and close properly
- [ ] Calculations work correctly
- [ ] Game state persists during play

## SEO & Performance
- [ ] Page loads quickly
- [ ] Meta tags are present
- [ ] Schema markup is added (optional)
- [ ] Mobile-friendly design
- [ ] No console errors

## Security
- [ ] Files are properly secured
- [ ] No sensitive data exposed
- [ ] Content Security Policy configured (optional)

## Maintenance
- [ ] Set up regular backups
- [ ] Monitor for errors
- [ ] Plan for future updates
";

file_put_contents($wordpressDir . '/CHECKLIST.md', $checklistContent);
echo "✅ Created: CHECKLIST.md for installation verification\n";

echo "\n🎉 Setup complete!\n\n";
echo "📁 Your WordPress-ready files are in: $wordpressDir\n";
echo "📖 Read the README.md file for installation instructions\n";
echo "✅ Use the CHECKLIST.md file to verify your installation\n\n";

echo "Next steps:\n";
echo "1. Upload the files from '$wordpressDir' to your WordPress theme\n";
echo "2. Create a new page in WordPress admin\n";
echo "3. Set the page template to 'Sheep Station Manager Game'\n";
echo "4. Test the game functionality\n\n";

echo "For detailed instructions, see: WORDPRESS_INSTALLATION_GUIDE.md\n";
?> 