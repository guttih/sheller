

export enum GUIDLength {
   guid16 = 16,
   guid20 = 20,
   guid24 = 24,
   guid32 = 32,
   guid64 = 64,
   guid128= 128
}

export class TextHelper {
    static centerText(text: string, width: number, padding: string = " "): string {
        if (text.length > width) {
            return text;
        }

        let leftPadding = Math.floor((width - text.length) / 2);
        let rightPadding = width - text.length - leftPadding;

        return padding.repeat(leftPadding) + text + padding.repeat(rightPadding);
    }
}

export class GuidGenerator {

    /**
     *  Generates a guid string
     * 
     * @param hyphenated Should the guid be hyphenated
     * @param length the length of the guid (usually 32)
     * @returns a string representation of a guid
     */
    static generate(hyphenated: boolean = false, length: GUIDLength = GUIDLength.guid32): string {
        
        let guid = GuidGenerator.generateGuid(length);

        if (hyphenated && length >= 16) {
            return GuidGenerator.hyphenateGuid(guid);
        }

        return guid;
    }

    /**
     * Generates a guid string without hyphens
     * 
     * @param length the length of the guid (usually 32)
     * @returns a guid string
     */
    static generateGuid(length: number): string {
        const hexChars = '0123456789abcdef';
        let guid = '';
      
        for (let i = 0; i < length; i++) {
          guid += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
        }
      
        return guid;
    }

    /// <summary>
    /// Adds hyphens to a guid string
    /// Supports 16, 20, 24, 32, 64, 128 length strings
    /// </summary>
    /// <param name="guid">The GUID.</param>
    /// <returns>A guid string with hyphens added for better readability. On error, original string is returned</returns>

    static hyphenateGuid(guid: string): string {
        switch (guid.length) {
            case 16: return guid.replace(/(\w{4})(\w{4})(\w{4})(\w{4})/, '$1-$2-$3-$4');
            case 20: return guid.replace(/(\w{4})(\w{4})(\w{4})(\w{4})(\w{4})/, '$1-$2-$3-$4-$5');
            case 24: return guid.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{4})/, '$1-$2-$3-$4-$5');
            case 32: return guid.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
            case 64: return guid.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5-$6-$7-$8-$9-$10');
            case 128: return guid.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5-$6-$7-$8-$9-$10-$11-$12-$13-$14-$15-$16-$17-$18-$19-$20');
            default: return guid;
        }
    }
}
