This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Template Blogger With React JS

This template build with React JS and Experimental for use in your blogger Web. Combine with Blogger API, Blogger JSON Feed and some stuff like npm dependencies.

### is React SSR?

Actually <strong>Yes</strong>, because this is manipulating with HTML DOM and React DOM by Injecting View to <kbd>id</kbd> in template.xml. So, ssr rendering is default by blogger ssr flow not React Route.

### is Open Source?

<strong>Yes</strong>, you can clone and try to modify source code by running <kbd>npm</kbd> or <kbd>yarn</kbd>.


### How to use this template?

First, you can copy and paste to Blogger template editor. then change some configuration script bellow:

<pre>
<script>
  window.__CODEPELAJAR_CONFIG__ = {
    blogId: "{{ BLOG_ID }}",
    disqus: "{{ DISQUS_SHORTNAME }}",
    defaultImage: "{{ DEFAULT_IMAGE_URL }}",
    addThisId: "{{ ADDTHIS_ID }}",
    cseUrl: "{{ GOOGLE_CSE_URL }}"
  };
</script>
</pre>

### How to custom this template?

Just clone and run React env in your local.


### FYI

please report any issue to <strong>indrawanlisantopersonal@gmail.com</strong>

---

## Blogger Template Automation

Update the Blogger XML template with real blog data automatically using the included script:

```bash
# Interactive TUI mode (recommended for first use)
yarn blogger:update

# CLI mode with flags
yarn blogger:update:cli              # update with default blog ID
yarn blogger:update --blog-id XXXX   # update specific blog
yarn blogger:update:preview          # preview changes without writing
yarn blogger:update:json             # output JSON data only
```

### Script Features

- **Fetches real data** from Blogger API (posts, featured post, blog info)
- **Updates template placeholders**: `__POPULAR_POST__`, `__POSTS__`, `__CODEPELAJAR_CONFIG__`
- **Two modes**: Interactive TUI and CLI with flags
- **Zero dependencies**: Uses only Node.js built-in modules
- **Safe updates**: Preview mode and confirmation prompts

### CLI Options

| Flag | Description |
|------|-------------|
| `-b, --blog-id` | Blog ID to update (default: from utils/index.js) |
| `-o, --output` | Output file path (default: public/index.html) |
| `-j, --json` | Output as JSON instead of HTML |
| `-p, --preview` | Preview changes without writing |
| `-f, --force` | Force update without confirmation |
| `-h, --help` | Show help message |
