# Structuring your SCSS
The file structure serves two purposes:

* You won't have to edit one huge file with hundreds or thousands of lines. This
  makes it much easier to **maintain** your SCSS.
* Dividing your SCSS into base, components, slots and layout helps you remember
  and manage the dynamic nature of Diversity themes. This makes it much easier
  to **write good style sheets**.

## A few prinicples
* Keep your structure as **flat** as possible. Don't nest unless you have to.
* Diversity themes are very **dynamic**. Design with this in mind. Users will move
  and switch components. They will use components the theme is not originally
  designed for.
* Use classes generously. Make your theme **hackable**. It should be easy for
  users to add their own custom CSS. Don't let them create overly complicated
  and obscure rules, let them access what they want directly:
  * Good: `.theme-prefix--help-icon`
  * Bad: `.container header > p > span:nth-child(3)`
* Avoid `!important`. `!important` is usually hints that your (S)CSS needs to be
  improved. Keeping your CSS flat is a part of the solution. If you really do
  need to use `!important`, _always_ leave a comment explaining why.
* Use variables, functions and mixins to set things like colors, font-families.

## /base
This directory is for general styling that is to be applied globally. This is
the place to style any third party plugin or add-on that you'll be using.

### \_html.scss
Set styling for HTML elements here, like `body` and `h1` etc. There is no need
for a full reset since normalize.css is included through Bootstrap.

For styles concerning limited regions of your design (like the header or the
footer), look to `/layout`.

### \_bootstrap.scss
Override the default Bootstrap styling here. You probably want to set your own
colors and font-sizes. Tip: Use variables!

### \_schema-form.scss
Angular Schema Form is a core part of Diversity themes. If you want to
customize it, this is the place.

## /components
Even though components should just work out-of-the-box, you probably want to
tweak them to suit your theme perfectly. Name the files after the components
they style, e.g. `_tws-checkout.scss` for the tws-checkout component.

All rules should start with the component's prefix. If you need to add classes
before the component class your rule belongs in `/slots` or `/layout`.

## /slots
Sometimes you want to change the appearance of a specific slot. If so, this is
the place to put that SCSS. This is useful since users can move components.
Slots let you access the slot without having to know what the user has placed
there.

Sometime it is also useful to style a component _only if it appears in a
specific slot_.

If your rule starts with a `.slot--*` class, this is where you want to put it.
If your rule does not start with a `.slot--*` class, put it in `/layout` or
`/components`.

## /layout
Some styling is broader than just a slot. It may concern a collection of slots,
a specific page or a larger section of the page, like the header or footer.

The rules in your layout files should start with your `.theme-prefix--`. If you
see yourself writing rules starting with `.slot--*` or component prefixes, move
them to `/slots` and `/components`.

## /helpers
This is the place to put variables, functions, mixins and other SCSS goodness.
