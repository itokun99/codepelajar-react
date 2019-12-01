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
