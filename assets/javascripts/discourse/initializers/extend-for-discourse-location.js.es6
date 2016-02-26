import { withPluginApi } from 'discourse/lib/plugin-api';
import Composer from 'discourse/components/d-editor';

// Server key 1
// AIzaSyD2jRDDiDnyEZuBh9tD7x0Tr5n3Mi-QSRw

export default {
  name: 'extend-for-discourse-location',
  initialize () {
    withPluginApi('0.1', api => {

      api.onToolbarCreate(toolbar => {
        toolbar.addButton({
          id: 'discourse-location',
          group: 'extras',
          icon: 'map-marker',
          action: 'findLocation',
          title: ''
        });
      });

      Composer.reopen({
        actions: {
          findLocation() {
            const sel = this._getSelected();
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
              });
            }

            this._addText(sel, '<div id="map"></div>');
          }
        }
      });

    });
  }
}