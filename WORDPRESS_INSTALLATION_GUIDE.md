# WordPress Installation Guide for Sheep Station Manager Game

## **Recommended Approach: WordPress Custom Page Template**

This guide will help you integrate your educational sheep farming game into your WordPress website using a custom page template approach.

## **Prerequisites**

- WordPress website with admin access
- FTP access or file manager access to your WordPress theme directory
- Basic understanding of WordPress file structure

## **Step-by-Step Installation**

### **Step 1: Prepare Your Game Files**

1. **Create a folder structure in your WordPress theme:**
   ```
   your-theme/
   ├── page-sheep-game.php          (Custom page template)
   ├── sheep-game-modals.php         (Modal dialogs)
   └── sheep-game/                   (Game assets folder)
       ├── css/
       │   ├── main.css
       │   └── responsive.css
       └── js/
           ├── game.js
           ├── calculations.js
           ├── validation.js
           └── pdf-export.js
   ```

2. **Upload your existing game files:**
   - Copy `css/main.css` and `css/responsive.css` to `your-theme/sheep-game/css/`
   - Copy `js/game.js`, `js/calculations.js`, `js/validation.js`, and `js/pdf-export.js` to `your-theme/sheep-game/js/`

### **Step 2: Upload Template Files**

1. **Upload the custom page template:**
   - Copy `page-sheep-game.php` to your WordPress theme directory
   - This file should be in the same directory as your theme's `style.css`

2. **Upload the modals file:**
   - Copy `sheep-game-modals.php` to your WordPress theme directory

### **Step 3: Create the WordPress Page**

1. **Log into your WordPress admin dashboard**
2. **Go to Pages → Add New**
3. **Set the page title:** "Sheep Station Manager Game"
4. **In the Page Attributes section (right sidebar):**
   - Set Template to "Sheep Station Manager Game"
5. **Publish the page**

### **Step 4: Test and Configure**

1. **Visit your new page** to ensure the game loads correctly
2. **Check mobile responsiveness** on different devices
3. **Test all game functionality** (purchases, calculations, modals)

## **Alternative Installation Methods**

### **Option 2: WordPress Page with iFrame (Simple but Limited)**

**Pros:**
- ✅ Quick setup
- ✅ No theme modifications required
- ✅ Easy to update game files

**Cons:**
- ❌ Limited WordPress integration
- ❌ SEO challenges
- ❌ Potential responsive issues
- ❌ No WordPress navigation/branding

**Implementation:**
1. Upload your game files to a subdirectory of your WordPress site
2. Create a WordPress page with this content:
   ```html
   <iframe src="/path-to-your-game/index.html" 
           width="100%" 
           height="800px" 
           frameborder="0" 
           scrolling="no">
   </iframe>
   ```

### **Option 3: WordPress Plugin (Advanced)**

**Pros:**
- ✅ Full WordPress integration
- ✅ Easy updates through WordPress admin
- ✅ Professional deployment
- ✅ Analytics integration

**Cons:**
- ❌ More complex development
- ❌ Requires plugin development skills

**Implementation:**
Create a WordPress plugin that:
1. Registers a custom post type for games
2. Provides admin interface for game settings
3. Handles asset loading and caching
4. Integrates with WordPress hooks and filters

## **Troubleshooting Common Issues**

### **Game Not Loading**

**Check these common causes:**

1. **File Paths:**
   ```php
   // Verify these paths in page-sheep-game.php
   <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/sheep-game/css/main.css">
   <script src="<?php echo get_template_directory_uri(); ?>/sheep-game/js/game.js"></script>
   ```

2. **File Permissions:**
   - Ensure all files have proper read permissions (644 for files, 755 for directories)

3. **JavaScript Errors:**
   - Open browser developer tools (F12)
   - Check Console tab for JavaScript errors
   - Verify all JS files are loading correctly

### **Styling Issues**

1. **Theme Conflicts:**
   ```css
   /* Add to your theme's style.css to override conflicts */
   .page-template-page-sheep-game .entry-content {
       padding: 0 !important;
       margin: 0 !important;
   }
   ```

2. **Responsive Issues:**
   - Test on mobile devices
   - Check CSS media queries
   - Ensure viewport meta tag is present

### **Performance Issues**

1. **Minify Assets:**
   - Use WordPress plugins like "Autoptimize" or "WP Rocket"
   - Minify CSS and JavaScript files

2. **Caching:**
   - Enable WordPress caching
   - Use CDN for static assets

## **SEO Optimization**

### **Add Meta Tags to Your Page Template:**

```php
// Add this to the head section of page-sheep-game.php
<meta name="description" content="Educational math game for Year 5 students. Practice multiplication, unit rates, and profit-loss analysis through sheep farming simulation.">
<meta name="keywords" content="educational game, math, multiplication, profit loss, sheep farming, Year 5">
<meta name="author" content="Your Name">
```

### **Schema Markup for Educational Content:**

```php
// Add this before closing </head> tag
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  "name": "Sheep Station Manager",
  "description": "Educational math game for Year 5 students",
  "educationalLevel": "Year 5",
  "learningResourceType": "Game",
  "teaches": ["Multiplication", "Unit Rates", "Profit-Loss Analysis"]
}
</script>
```

## **Security Considerations**

1. **File Upload Security:**
   - Only upload files you created
   - Scan files with antivirus software
   - Use secure FTP connections

2. **Content Security Policy:**
   ```php
   // Add to your theme's functions.php
   add_action('wp_head', function() {
       if (is_page_template('page-sheep-game.php')) {
           header("Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval'");
       }
   });
   ```

## **Maintenance and Updates**

### **Updating the Game:**

1. **Backup your current files**
2. **Upload new versions** to the `sheep-game/` directory
3. **Clear WordPress cache** if using caching plugins
4. **Test functionality** on the live site

### **WordPress Updates:**

1. **Test compatibility** with new WordPress versions
2. **Update theme files** if necessary
3. **Check for deprecated functions**

## **Recommended WordPress Plugins**

For optimal performance and functionality:

1. **Caching:** WP Rocket or Autoptimize
2. **Security:** Wordfence Security
3. **SEO:** Yoast SEO or Rank Math
4. **Analytics:** Google Analytics for WordPress
5. **Backup:** UpdraftPlus

## **Support and Resources**

- **WordPress Codex:** https://codex.wordpress.org/
- **WordPress Theme Development:** https://developer.wordpress.org/themes/
- **WordPress Support Forums:** https://wordpress.org/support/

## **Performance Tips**

1. **Optimize Images:** Use WebP format where possible
2. **Minify Code:** Remove unnecessary whitespace and comments
3. **Use CDN:** Serve static assets from a CDN
4. **Enable Gzip:** Compress files for faster loading
5. **Database Optimization:** Regularly clean and optimize your database

---

**Need Help?** If you encounter issues during installation, check the troubleshooting section above or consult WordPress documentation for your specific error messages. 