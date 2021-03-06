﻿import AppDispatcher from '../dispatcher/Dispatcher';
import CategoryConstants from '../constants/CategoryConstants';
import CategoriesRepository from '../repositories/CategoriesRepository';
import { EventEmitter } from 'events';

const SAVED_EVENT = 'category_saved';
const DELETED_EVENT = 'category_deleted';
const ALLLOADED_EVENT = 'category_allloaded';

const categoryRepository = new CategoriesRepository();

const state = {};

function saveCategory(category){
    return categoryRepository.save(category).then(response => {
        state.saved = {
            status: response.status,
            data: response.data
        };

        CategoriesStore.emitSaved();
    }).then(getCategories);
}

function deleteCategory(id) {
    categoryRepository.delete(id).then(() => {
        CategoriesStore.emitDeleted();
    }).then(getCategories);
}

function getCategories(){
    categoryRepository.get().then(response => {
        state.categories = response.data;
        state.categoryMap = {};
        for (let category of state.categories) {
            state.categoryMap[category.id] = category;

            if (!category.children || category.children.length === 0) {
                continue;
            }

            for (let child of category.children) {
                state.categoryMap[child.id] = child;
            }
        }

        CategoriesStore.emitAllLoaded();
    });
}

class CategoriesStoreClass extends EventEmitter {
    emitSaved() {
        this.emit(SAVED_EVENT);
    }

    addSavedListener(callback) {
        this.on(SAVED_EVENT, callback);
    }

    removeSavedListener(callback) {
        this.removeListener(SAVED_EVENT, callback);
    }

    emitAllLoaded() {
        this.emit(ALLLOADED_EVENT);
    }

    addAllLoadedListener(callback) {
        this.on(ALLLOADED_EVENT, callback);
    }

    removeAllLoadedListener(callback) {
        this.removeListener(ALLLOADED_EVENT, callback);
    }

    emitDeleted() {
        this.emit(DELETED_EVENT);
    }

    addDeletedListener(callback) {
        this.on(DELETED_EVENT, callback);
    }

    removeDeletedListener(callback) {
        this.removeListener(DELETED_EVENT, callback);
    }

    getSaved(){
        return state.saved;
    }

    getCategories() {
        return state.categories;
    }

    getCategoryMap(){
        return state.categoryMap;
    }

    getCategory(id) {
        const category = state.categoryMap ? state.categoryMap[id] : null;
        if (!category){
            getCategories();
            return null;
        }

        return category;
    }
}

const CategoriesStore = new CategoriesStoreClass();

getCategories();

CategoriesStore.dispatchToken = AppDispatcher.register(action => {
    switch(action.actionType) {
      
        case CategoryConstants.CATEGORY_SAVE:
            saveCategory(action.category);
            break;
      
        case CategoryConstants.CATEGORY_DELETE:
            deleteCategory(action.id);
            break;

        default:
    }
});

export default CategoriesStore;