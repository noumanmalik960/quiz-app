// to shuffle the data (i-e the correct answer and the incorrect ones)

export const shuffleArray = (array: any[]) => 
    [...array].sort(() => Math.random() -0.5)