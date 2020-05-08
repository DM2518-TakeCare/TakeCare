import { Tag } from "../model/shared/task-interface";

export function getLogoFromTag(tag: Tag) {
    switch (tag) {
        case 'Groceries':
            return 'food';
        case 'Mail':
            return 'email';
        case 'Medicine':
            return 'medical-bag';
    }
}