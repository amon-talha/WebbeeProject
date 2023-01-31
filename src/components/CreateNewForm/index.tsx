import { useState } from "react";
import { StyleSheet } from 'react-native';
import { View, Button, Text } from "react-native-ui-lib"

import Categoryinput from "../Input/CategoryInput";
import InputWithLable from "../Input/InputWithLable";
import CustomePicker from "../Input/picker"
import { FieldTypesArray } from "../../commons/emuns";
import { Category } from "../../store/features/category";

type FieldType = {
    lable: string,
    type: string
}

type FormType = {
    removeCategory: (categoryId: string) => void,
    updateCategory: (categoryId: Category) => void,
    data: Category,
    index: number
}

const Form = ({ removeCategory, updateCategory, data, index }: FormType) => {
    const [fields, setFields] = useState<FieldType[]>([])
    const [render, setRender] = useState<boolean>(false)
    const [CategoryTitle, setCategoryTitle] = useState<string>('')

    //====================================================
    const updateCategoryTitle = (value: string) => {
        setCategoryTitle(value)
    }
    //====================new=============================
    const addDataToField: (index: number, value: string) => void =
        (index: number, value: string) => {
            const newData = JSON.parse(JSON.stringify(data));
            const existingFiled = newData.fields;
            if (existingFiled[index]) {
                existingFiled[index].lable = value;
                updateCategory(newData);
            }
        }
    const reMoveField = (index: number) => {
        // removeCategory(data.categoryId || '')
        if (data.fields[index]) {
            const newData = JSON.parse(JSON.stringify(data));
            newData.fields.splice(index, 1);
            updateCategory(newData);
        }
    }
    const addNewFiled = (value: string) => {
        const newData = JSON.parse(JSON.stringify(data));
        newData.fields.push({ lable: '', type: value })
        updateCategory(newData)
    }
    const handleRemoveCategory = () => {
        removeCategory(data.categoryId || '')
    }
    //====================================================

    return (
        <View style={styles.container}>
            <View style={styles.CategoryTitlecontainer}>
                <Text style={styles.categoryTitle}>{CategoryTitle || "Category Name"}</Text>
                <InputWithLable
                    handleChange={updateCategoryTitle}
                    placeHolder="Field"
                    lable={CategoryTitle}

                />
            </View>
            {
                data.fields.length ?
                    data.fields.map((ele: FieldType, index: number) => {
                        return (
                            <View key={index + ele.type}>
                                <Categoryinput
                                    index={index}
                                    data={ele}
                                    onChangeText={addDataToField}
                                    reMoveField={reMoveField}
                                />
                            </View>
                        )
                    }) : null
            }

            <View>
                <View style={[styles.btnContainer, { zIndex: 22 - index }]}>
                    <View style={{ height: 45, marginBottom: 10, width: '46%' }}>
                        <CustomePicker onSelect={addNewFiled} FieldTypesArray={FieldTypesArray} />
                    </View>

                    <Button
                        backgroundColor="#DC4A9A"
                        label="Delete"
                        borderRadius={7}
                        style={{ height: 45, marginBottom: 10, width: '46%' }}
                        onPress={handleRemoveCategory}
                    />
                </View>
                <Button
                    backgroundColor="#275070"
                    label="Select title"
                    borderRadius={7}
                    style={{ height: 45, marginBottom: 10, fontWeight: 600 }}
                    onPress={() => console.log(fields)}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: '#f1faff',
        padding: 14,
        borderRadius: 8
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 28
    },
    CategoryTitlecontainer: {
        marginBottom: 16
    }
});

export default Form;