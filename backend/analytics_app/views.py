from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from products.models import Product
from orders.models import Order, OrderItem


class AnalyticsView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        total_products = Product.objects.count()

        total_orders = Order.objects.count()

        total_revenue = sum(
            order.total_price
            for order in Order.objects.all()
        )

        top_product = None

        items = OrderItem.objects.all()

        product_counts = {}

        for item in items:

            name = item.product.name

            product_counts[name] = (
                product_counts.get(name, 0)
                + item.quantity
            )

        if product_counts:

            top_product = max(
                product_counts,
                key=product_counts.get
            )

        return Response({
            "total_products": total_products,
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "top_product": top_product,

            "sales_chart": [
                {"name": "Jan", "sales": 0},
                {"name": "Feb", "sales": 0},
                {"name": "Mar", "sales": 0},
                {"name": "Apr", "sales": 90000},
                {"name": "May", "sales": 100000},
                {"name": "June", "sales": total_revenue},
            ],

            "products_chart": [
                {"name": "Laptops", "value": 1},
                {"name": "Books", "value": 1},
                {"name": "Clothes", "value": 1},
            ]
})