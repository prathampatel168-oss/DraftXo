export const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
    })

export async function getCroppedImg(imageSrc, pixelCrop) {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = image.width
    canvas.height = image.height

    // draw image at 0, 0
    ctx.drawImage(image, 0, 0)

    // set canvas width to final desired crop size - this will clear existing context
    const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
    )

    // set proper canvas dimensions to fit the crop image
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // paste generated rotate image taking the top left corner as the reference point
    ctx.putImageData(data, 0, 0)

    // As Base64 string
    return canvas.toDataURL('image/jpeg');
}
