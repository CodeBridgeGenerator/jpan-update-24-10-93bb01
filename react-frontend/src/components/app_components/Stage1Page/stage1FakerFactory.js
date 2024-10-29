
import { faker } from "@faker-js/faker";
export default (user,count,kategoriIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
nomborRujukan: faker.lorem.sentence(""),
tajukLatihan: faker.lorem.sentence(""),
dokumen: faker.lorem.sentence(""),
kategori: kategoriIds[i % kategoriIds.length],
status: faker.lorem.sentence(""),
completed: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
