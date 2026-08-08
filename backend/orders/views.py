from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Order, OrderItem
from products.models import Product


class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        cart = request.data.get("cart", [])

        total_price = 0

        order = Order.objects.create(
            user=request.user,
            total_price=0
        )

        for item in cart:

            product = Product.objects.get(
                id=item["id"]
            )

            quantity = item["quantity"]

            total_price += (
                product.price * quantity
            )

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity
            )

        order.total_price = total_price
        order.save()

        return Response({
            "message": "Order created successfully"
        })