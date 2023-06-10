export const UpdateGroup=(setGroups,inGroupId,newName) => {
    setGroups(prevGroups => {
        return prevGroups.map(group => {
            if (group.groupId === inGroupId) {
                return {...group, name: newName};
            }
            return group;
        });
    })
}