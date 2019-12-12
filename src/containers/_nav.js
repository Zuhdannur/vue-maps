export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Maps',
        to: '/dashboard',
        icon: 'cilLocationPin', 
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Place',
        to: '/place',
        icon: 'cilOptions'
      },
    ]
  }
]