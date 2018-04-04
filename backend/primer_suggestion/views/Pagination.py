from rest_framework.pagination import PageNumberPagination


class NotPaginatedSetPagination(PageNumberPagination):
    page_size = 10000
