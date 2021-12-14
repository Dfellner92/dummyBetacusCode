import { groupBoxColor } from "../groupBoxColor";

describe(groupBoxColor.name, () => {
    it('Gets Group Box Color', () => {
        //arrange
        const groupHorsesValues = "2";

        //act

        const result = groupBoxColor(groupHorsesValues);

        //expect
        expect(result).toEqual("pink-box");

    })
}) 