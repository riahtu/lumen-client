

export const recordify = (obj_dict: any, factory: any) => {
  console.log(obj_dict, factory);
  return Object.keys(obj_dict)
    .reduce((acc, id: string) => {
      acc[id] = factory(obj_dict[id]);
      return acc;
    }, {});
};
