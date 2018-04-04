def user_permission(cls):
    '''Overides the get_queryset method on a view class to only
    return models associated with the user'''
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    cls.get_queryset = get_queryset
    return cls
