const Main = imports.ui.main;
const St = imports.gi.St;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const { panel } = imports.ui.main;


let ToggleNightLightExtension;

const ToggleNightLight = GObject.registerClass(
    class ToggleNightLight extends PanelMenu.Button {
        _init() {
            super._init(0);
            this.enabledStatus;

            this.removeAggregateMenu();

            this._settings = new Gio.Settings({
                schema_id: "org.gnome.settings-daemon.plugins.color"
            });

            this._settings.connect('changed::night-light-enabled', () => this.setIcon());

            this.icon = new St.Icon({
                icon_name: '',
                style_class: 'system-status-icon',
            });

            this.setIcon();

            this.add_child(this.icon);

            this.connect('button-press-event', this.toggleState.bind(this));
            this.connect('touch-event', this.toggleState.bind(this));
        }

        removeAggregateMenu() {
            this._nightLight = Main.panel.statusArea.aggregateMenu._nightLight;
            this._nightLight.indicators.remove_actor(this._nightLight._indicator);
            this._nightLight.indicators.hide();
            this._nightLight._sync = function () { };
        }

        restoreAggregateMenu() {
            this._nightLight = Main.panel.statusArea.aggregateMenu._nightLight;
            this._nightLight.indicators.add_actor(this._nightLight._indicator);
            this._nightLight.indicators.show();
        }

        setIcon() {
            if (this._settings.get_boolean("night-light-enabled")) {
                this.icon.icon_name = 'night-light-symbolic';
            }
            else {
                this.icon.icon_name = 'daytime-sunset-symbolic';
            }
        }

        toggleState() {
            this.enabledStatus = this._settings.get_boolean("night-light-enabled");
            this._settings.set_boolean("night-light-enabled", !this.enabledStatus);
            this.setIcon();
        }

    }
);

function init() {

}

function enable() {
    ToggleNightLightExtension = new ToggleNightLight();
    Main.panel.addToStatusArea('ToggleNightLight', ToggleNightLightExtension, 1);
}

function disable() {
    ToggleNightLightExtension.restoreAggregateMenu();
    ToggleNightLightExtension.destroy();

}