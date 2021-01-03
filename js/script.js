Vue.directive('money', {
    inserted(el, binding) {
        const amount = parseFloat(el.innerHTML).toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
        el.innerHTML = `${binding.value} ${amount}`
    }
})

new Vue({
    el: '#app',
    data: {
        title: 'Relatorio',
        sales: null
    },
    methods: {
        getSales() {
            fetch(`/data/sales.json`)
                .then(response => response.json())
                .then(data => this.sales = data)
        },
        totalValues(sales) {
            if (!sales) return 0
            return sales.reduce((total, sale) => total + sale.value, 0)
        }
    },
    computed: {
        salesByProduct() {
            if (!this.sales) return null

            const salesByProduct = this.sales.reduce((grouped, sale) => {
                if (!grouped.hasOwnProperty(sale.nome)) {
                    grouped[sale.name] = {
                        name: sale.name,
                        value: sale.price * sale.qtde
                    }
                    return grouped
                }
                grouped[sales.name].value = sale.price * sale.qtde
                return grouped
            }, {})

            return Object.values(salesByProduct)

        }
    },
    mounted() {
        this.getSales()
    }
})