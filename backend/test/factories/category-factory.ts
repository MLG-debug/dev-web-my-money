import { Category, ICategoryProperties } from '@app/entities/category'

type Override = Partial<ICategoryProperties>

export const makeCategory = (override: Override = {}) => {
  const category = new Category({
    name: 'Category',
    archived: false,

    ...override,
  })

  return { category }
}
