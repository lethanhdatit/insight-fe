import "server-only"

const dictionaries = {
  vi: () => import("./dictionaries/vi.json").then((module) => module.default),
}

export const getDictionary = async (locale: "vi") => dictionaries[locale]()
