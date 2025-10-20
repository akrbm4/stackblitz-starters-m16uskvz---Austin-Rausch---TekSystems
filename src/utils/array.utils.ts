export class ArrayUtils {
  /**
   * Get unique values from an array based on a specific key
   */
  static getUniqueValues<T>(array: T[], key: keyof T): T[keyof T][] {
    return [...new Set(array.map((item) => item[key]))];
  }

  /**
   * Filter array by multiple conditions
   * TODO: Candidates may need to enhance this for complex filtering
   */
  static filterByMultipleConditions<T>(array: T[], filters: Partial<T>): T[] {
    return array.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === null) return true;
        return item[key as keyof T] === value;
      });
    });
  }

  /**
   * Group array items by a specific key
   */
  static groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((groups, item) => {
      const keyValue = String(item[key]);
      if (!groups[keyValue]) {
        groups[keyValue] = [];
      }
      groups[keyValue].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }
}
