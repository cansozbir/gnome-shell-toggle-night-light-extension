# gnome-shell-toggle-night-light-extension
This extension lets you toggle night-light from the top-bar by clicking it.

![demo](demo.gif)

It seems like doesn't work because there are no color changes on demo.gif but this is just because screen capture doesn't capture night-lighted output. So, it works.

To make this extension much powerful, you can set a manual schedule from gnome settings like this.

![settings](settings.png)

Setting the "From" and the "To" as the same value allows you to use night-light anytime you want with a simple click on the extension.

### Installation

```git clone https://github.com/cansozbir/gnome-shell-toggle-night-light-extension```

```cd gnome-shell-toggle-night-light-extension/```

```cp -r toggle-night-light@cansozbir.github.io/ ~/.local/share/gnome-shell/extensions/```

After restarting your gnome-shell by pressing Alt+F2 and entering "r" or with login after logout, you can enable the extension from the gnome's extensions app or gnome-tweaks app.