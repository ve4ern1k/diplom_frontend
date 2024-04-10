let staffGroups = [
    {
        id: 1,
        title: "Админ",
        description: "самая важная шишка",
        access_rights: {
            seeStaff: {
                name: 'Просматривать "Сотрудники"',
                is: true
            },
            seeStaffGroups: {
                name: 'Просматривать "Группы сотрудников"',
                is: true
            },
            seeOrders: {
                name: 'Просматривать "Заказы"',
                is: true
            },
            seePublications: {
                name: 'Просматривать "Публикации"',
                is: true
            },
            updateStaff: {
                name: 'Редактировать "Сотрудники"',
                is: true
            },
            updateStaffGroups: {
                name: 'Редактировать "Группы сотрудников"',
                is: true
            },
            updateOrders: {
                name: 'Редактировать "Заказы"',
                is: true
            },
            updatePublications: {
                name: 'Редактировать "Публикации"',
                is: true
            },
            changeAuthData: {
                name: 'Изменять данные аутентификации пользователя',
                is: true
            },
            writePublications: {
                name: 'Добавлять публикации',
                is: true
            }
        }
    },
    {
        id: 2,
        title: "Модератор сайта",
        description: "пишет балдёжные текстики",
        access_rights: {
            seeStaff: {
                name: 'Просматривать "Сотрудники"',
                is: true
            },
            seeStaffGroups: {
                name: 'Просматривать "Группы сотрудников"',
                is: true
            },
            seeOrders: {
                name: 'Просматривать "Заказы"',
                is: true
            },
            seePublications: {
                name: 'Просматривать "Публикации"',
                is: true
            },
            updateStaff: {
                name: 'Редактировать "Сотрудники"',
                is: false
            },
            updateStaffGroups: {
                name: 'Редактировать "Группы сотрудников"',
                is: false
            },
            updateOrders: {
                name: 'Редактировать "Заказы"',
                is: false
            },
            updatePublications: {
                name: 'Редактировать "Публикации"',
                is: false
            },
            changeAuthData: {
                name: 'Изменять данные аутентификации пользователя',
                is: false
            },
            writePublications: {
                name: 'Добавлять публикации',
                is: true
            }
        }
    },
    {
        id: 3,
        title: "Работяга",
        description: "гроши - тоже деньги",
        access_rights: {
            seeStaff: {
                name: 'Просматривать "Сотрудники"',
                is: true
            },
            seeStaffGroups: {
                name: 'Просматривать "Группы сотрудников"',
                is: false
            },
            seeOrders: {
                name: 'Просматривать "Заказы"',
                is: true
            },
            seePublications: {
                name: 'Просматривать "Публикации"',
                is: false
            },
            updateStaff: {
                name: 'Редактировать "Сотрудники"',
                is: false
            },
            updateStaffGroups: {
                name: 'Редактировать "Группы сотрудников"',
                is: false
            },
            updateOrders: {
                name: 'Редактировать "Заказы"',
                is: false
            },
            updatePublications: {
                name: 'Редактировать "Публикации"',
                is: false
            },
            changeAuthData: {
                name: 'Изменять данные аутентификации пользователя',
                is: false
            },
            writePublications: {
                name: 'Добавлять публикации',
                is: false
            }
        }
    },
]

export default staffGroups