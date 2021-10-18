export default ResDef;
export function ResDef(res, options) {
    const done = options.status >= 400;
    res
        .status(options.status)
        .send({
        done: done,
        status: options.status,
        data: done ? options.data || {} : null,
        error: done ? null : options.error || { name: "Unexpected", message: "IDK" }
    });
}
