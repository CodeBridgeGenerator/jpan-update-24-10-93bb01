
import { faker } from "@faker-js/faker";
export default (user,count,nameIds,tajukLatihanIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
tajukLatihan: tajukLatihanIds[i % tajukLatihanIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
