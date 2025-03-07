const { Component, State } = Shopware;
const { Criteria } = Shopware.Data;
const { mapState } = Shopware.Component.getComponentHelper();
const { getByName } = Shopware.Locale;
const { Mixin } = Shopware;
const { cloneDeep } = Shopware.Utils.object;

Component.override('sw-product-list', {
    mounted() {
        this.defaultFilters.push('ean-filter');
        this.defaultFilters.push('productnumber-filter');
    },

    computed: {
        listFilters() {
            const filters = this.$super('listFilters');

            const eanFilter = this.filterFactory.create('product', {
                'ean-filter': {
                    property: 'ean',
                    label: this.$tc('productlist.filter.ean'),
                    placeholder: this.$tc('productlist.filter.eanProperties'),
                    type: "an-string-filter"
                }
            });

            const productnumberFilter = this.filterFactory.create('product', {
                'productnumber-filter': {
                    property: 'productNumber',
                    label: this.$tc('productlist.filter.productNumber'),
                    placeholder: this.$tc('productlist.filter.productNumberProperties'),
                    type: "an-string-filter"
                }
            });

            filters.unshift(
                eanFilter.at(0),
                productnumberFilter.at(0)
            );

            return filters;
        }
    }
});