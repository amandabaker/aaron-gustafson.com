---
date: 2014-07-17 08:21:47 -04:00
title: "The “Native” vs. “Stylable” Tug of War"
description: "In his astute post “‘Native experience’ vs styling select boxes”, Bruce Lawson correctly identified a common tension in the web world: wanting better form controls vs. wanting to throw away what the browser does. Here are my thoughts."
tags: [ "web design", browsers, design, mobile, native ]
comments: true
canonical: http://blog.easy-designs.net/archives/the-native-vs-stylable-tug-of-war/
canonical_site: The Easy Designs Blog
redirect_from: /notebook/2014/the-native-vs-stylable-tug-of-war/
---

In his astute post [“‘Native experience’ vs styling select boxes”](https://www.brucelawson.co.uk/2014/native-experience-vs-styling-select-boxes/), Bruce Lawson correctly identified a common tension in the web world:

> But why this urge to re-style page elements that end-users are familiar with? … Or is it that we love native look and feel, except when we don’t?

Speaking as the guy who not only wrote JavaScript to help me create an accessible `select` element alternative, but who also made it [the focus of a case study (image)](http://d1b14unh5d6w7g.cloudfront.net/1590598563.01.S0ER.LXXXXXXX.jpg?Expires=1405686346&Signature=DCT4Z0l75JQESDNyP0PVGVonuJYwY9XYtaTI3grX/RhdlLcXGRAVADJCB/N/fAj7GxLhEVzuXqstMebJIJ9Ip5I6kE7IKYt2F20F5EGD+1ghua9zKwyjS1e4KBgumMKzQytbcfIVX4dMr7XFzj26mScFKz9bSKtZT5jU1LU6hWM=&Key-Pair-Id=APKAIUO27P366FGALUMQ) in [AdvancED DOM Scripting](http://amzn.to/TaoffD), I am fully aware of the desire to have it both ways. I have not often seen the desire for both in a single individual, but it does happen in one particular instance occasionally.

<!-- more -->

Based on my own experience, I see the following arguments in favor of changing the display of a browser-delivered UI control quite often:

1. It doesn’t look good to me.
2. It is not “on brand”.
3. It clashes with our brand’s color scheme.
4. We want the web experience to feel like a platform-specific app.
5. It doesn’t behave how we think it should.

*(<abbr lang="it" title="nota bene: please note">n.b.</abbr> Browsers have done a pretty good job reducing the amount of color and the overall visual strength used in their UI controls to help them better blend in with a wide variety of designs, so clashes as mentioned in #3 happen far less often than they did nearly a decade ago.)*

As the weathered, battle tested (and, admittedly, somewhat jaded) front-end dev that I am, I typically push back with one or more of the following:

## In Addressing Desired Design Changes

In terms of aesthetics (addressing arguments 1, 2, and 3), I understand where you’re coming from. Browser-delivered UI controls are not the most appealing things, but they are familiar to your users. A `select` box they see on your site that looks like the one they see on Wikipedia or their banking site will be immediately recognizable. Sure, the looks and feel may differ from browser to browser, but most people use only a small number of browsers throughout the day—at work, at home, on their device—and if you want to ensure the design of a form control feels “right” in the browser they are using, sometimes it’s best to let go of that control.

## In Addressing OS Parity

I can understand the desire to have a form control in a web page look and feel like the same (or a similar) control within the operating system (argument 4), but I am not sure that’s a rabbit hole you want to go down. Here’s why: Achieving exact design and functional parity between a platform-specific control and a web control quite often requires extra markup, a bunch of CSS, and a bit of JavaScript. Anything is achievable with unlimited time and budget, so it’s completely doable, but it would be good to estimate the cost to see if you still think it is a worthwhile endeavor.

Assuming it is, we then have the question of which operating system to model the control after. Or maybe you want to offer a different take on the control based on the operating system your user is using. In that case, we may need to multiply the original estimate by the number of operating systems you want to support. But it’s worth noting that, in the Android world, different device manufacturers often “skin” the operating system to look different from other ones. Sometimes they even do it on a device-by-device basis. We’ll need to figure out which ones you want to include in your platform-like control matrix and multiply the estimate accordingly.

Then there’s maintenance. We’ll need to test these platform-like controls on each of their corresponding platforms and test the script that determines which experience gets delivered to which device to make sure we’re not accidentally sending the wrong experience. We’ll also need to test the delivery script on every other browser in our test matrix to ensure it is not causing issues there.

What should we do when a new operating system version is rolled out? iOS, for example, has made radical shifts in the design of their platform-specific controls in each major release. We’ll probably want to create unique versions of the control for each version of each OS we support and we’ll need to keep tabs on upgrades so we don’t end up confusing our users if they visit our site in iOS 7 and have a control that looks like it’s from iOS 6. We’ll need to add the number of OS versions into the multiplier as well.

Ok, and finally: How many controls did you want to apply this approach to again?

Or we could use the browser-delivered form control and it will just work.

## In Addressing Altered Behavior

I completely agree that not all browser-delivered UI controls work exactly how I would like, but there are several risks in changing the expected behavior.

First of all, there’s the possibility we could actually end up making the interface more confusing or that the change in behavior might not be exactly what our user’s wanted (either based on what they are used to or our mental model not aligning with theirs). In order to rule out these issues, we should run a few rounds of usability tests. These could be quick café tests or more formal studies depending on the budget.

Assuming our tests go well, we will need to maintain this code and do all of the requisite browser testing. And potentially upgrade our code as new browsers and browser versions come out. Depending on the complexity of the code, this could become a large requirement, but if it is ultimately in the service of making the web a better, more usable interaction environment, it could be worth it.

For what it’s worth, if we go this route and are successful, we should consider getting involved in the spec-writing process at the [W3C](https://w3.org) or  [WhatWG](https://whatwg.org). We should contribute our recommended changes back to the community and share what we learned. If we make a compelling argument, perhaps our idea will become part of some future standard and we can taper off our browser testing when the change lands in the platform.

<hr>

As you can probably tell, I’m not a really big fan of changing existing controls as I feel it can amount to a wasted effort. That said, if there are design improvements to be made—“design” in the true sense: being about how usable something is, not just how aesthetically-pleasing it is to someone (e.g. improving contrast, making the control more intuitive, etc.)—I’m willing to accept the change as something we *should* do and then work to make sure that change has been vetted and, if successful, given away for inclusion in other projects. If it solves a major issue on the web, I want to give that change every opportunity to make it into the appropriate spec by talking to the appropriate folks about it both in-person, in blog posts, and on the appropriate mailing list. If the change solves a problem in a specific browser, I want to see it incorporated into said browser and will file a bug report and try to build momentum around it by engaging the community.

Anyway, that’s my general position on augmenting browser-delivered UI controls. What are your thoughts on the topic?

_Note: I no longer use “native” in this context, but it remains in quoted material._
