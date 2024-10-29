
import { faker } from "@faker-js/faker";
export default (user,count,stage1Ids) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
nomborRujukan: faker.lorem.sentence(""),
tajukLatihan: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
stage1: stage1Ids[i % stage1Ids.length],
completed: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
