function isNonEmptyString(x) {
  return typeof x === "string" && x.trim().length > 0;
}

function badRequest(res, message, details = null) {
  return res.status(400).json({
    ok: false,
    error: { message, details }
  });
}

module.exports = { isNonEmptyString, badRequest };