/****************************************************************************
** Meta object code from reading C++ file 'file-transfer.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.2.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../build/src/plugins/org.apache.cordova.file-transfer/file-transfer.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'file-transfer.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.2.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_FileTransferRequest_t {
    QByteArrayData data[9];
    char stringdata[100];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    offsetof(qt_meta_stringdata_FileTransferRequest_t, stringdata) + ofs \
        - idx * sizeof(QByteArrayData) \
    )
static const qt_meta_stringdata_FileTransferRequest_t qt_meta_stringdata_FileTransferRequest = {
    {
QT_MOC_LITERAL(0, 0, 19),
QT_MOC_LITERAL(1, 20, 4),
QT_MOC_LITERAL(2, 25, 0),
QT_MOC_LITERAL(3, 26, 8),
QT_MOC_LITERAL(4, 35, 13),
QT_MOC_LITERAL(5, 49, 10),
QT_MOC_LITERAL(6, 60, 5),
QT_MOC_LITERAL(7, 66, 27),
QT_MOC_LITERAL(8, 94, 4)
    },
    "FileTransferRequest\0done\0\0progress\0"
    "bytesReceived\0bytesTotal\0error\0"
    "QNetworkReply::NetworkError\0code\0"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_FileTransferRequest[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
       3,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    0,   29,    2, 0x06,

 // slots: name, argc, parameters, tag, flags
       3,    2,   30,    2, 0x08,
       6,    1,   35,    2, 0x08,

 // signals: parameters
    QMetaType::Void,

 // slots: parameters
    QMetaType::Void, QMetaType::LongLong, QMetaType::LongLong,    4,    5,
    QMetaType::Void, 0x80000000 | 7,    8,

       0        // eod
};

void FileTransferRequest::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        FileTransferRequest *_t = static_cast<FileTransferRequest *>(_o);
        switch (_id) {
        case 0: _t->done(); break;
        case 1: _t->progress((*reinterpret_cast< qint64(*)>(_a[1])),(*reinterpret_cast< qint64(*)>(_a[2]))); break;
        case 2: _t->error((*reinterpret_cast< QNetworkReply::NetworkError(*)>(_a[1]))); break;
        default: ;
        }
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        switch (_id) {
        default: *reinterpret_cast<int*>(_a[0]) = -1; break;
        case 2:
            switch (*reinterpret_cast<int*>(_a[1])) {
            default: *reinterpret_cast<int*>(_a[0]) = -1; break;
            case 0:
                *reinterpret_cast<int*>(_a[0]) = qRegisterMetaType< QNetworkReply::NetworkError >(); break;
            }
            break;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (FileTransferRequest::*_t)();
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&FileTransferRequest::done)) {
                *result = 0;
            }
        }
    }
}

const QMetaObject FileTransferRequest::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_FileTransferRequest.data,
      qt_meta_data_FileTransferRequest,  qt_static_metacall, 0, 0}
};


const QMetaObject *FileTransferRequest::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *FileTransferRequest::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_FileTransferRequest.stringdata))
        return static_cast<void*>(const_cast< FileTransferRequest*>(this));
    return QObject::qt_metacast(_clname);
}

int FileTransferRequest::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 3)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 3;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 3)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 3;
    }
    return _id;
}

// SIGNAL 0
void FileTransferRequest::done()
{
    QMetaObject::activate(this, &staticMetaObject, 0, 0);
}
struct qt_meta_stringdata_FileTransfer_t {
    QByteArrayData data[17];
    char stringdata[122];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    offsetof(qt_meta_stringdata_FileTransfer_t, stringdata) + ofs \
        - idx * sizeof(QByteArrayData) \
    )
static const qt_meta_stringdata_FileTransfer_t qt_meta_stringdata_FileTransfer = {
    {
QT_MOC_LITERAL(0, 0, 12),
QT_MOC_LITERAL(1, 13, 5),
QT_MOC_LITERAL(2, 19, 0),
QT_MOC_LITERAL(3, 20, 4),
QT_MOC_LITERAL(4, 25, 4),
QT_MOC_LITERAL(5, 30, 2),
QT_MOC_LITERAL(6, 33, 8),
QT_MOC_LITERAL(7, 42, 3),
QT_MOC_LITERAL(8, 46, 6),
QT_MOC_LITERAL(9, 53, 6),
QT_MOC_LITERAL(10, 60, 8),
QT_MOC_LITERAL(11, 69, 7),
QT_MOC_LITERAL(12, 77, 8),
QT_MOC_LITERAL(13, 86, 8),
QT_MOC_LITERAL(14, 95, 6),
QT_MOC_LITERAL(15, 102, 7),
QT_MOC_LITERAL(16, 110, 10)
    },
    "FileTransfer\0abort\0\0scId\0ecId\0id\0"
    "download\0url\0target\0upload\0filePath\0"
    "fileKey\0fileName\0mimeType\0params\0"
    "headers\0httpMethod\0"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_FileTransfer[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
       3,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags
       1,    3,   29,    2, 0x0a,
       6,    7,   36,    2, 0x0a,
       9,   13,   51,    2, 0x0a,

 // slots: parameters
    QMetaType::Void, QMetaType::Int, QMetaType::Int, QMetaType::Int,    3,    4,    5,
    QMetaType::Void, QMetaType::Int, QMetaType::Int, QMetaType::QString, QMetaType::QString, QMetaType::Bool, QMetaType::Int, QMetaType::QVariantMap,    3,    4,    7,    8,    2,    5,    2,
    QMetaType::Void, QMetaType::Int, QMetaType::Int, QMetaType::QString, QMetaType::QString, QMetaType::QString, QMetaType::QString, QMetaType::QString, QMetaType::QVariantMap, QMetaType::Bool, QMetaType::Bool, QMetaType::QVariantMap, QMetaType::Int, QMetaType::QString,    3,    4,   10,    7,   11,   12,   13,   14,    2,    2,   15,    5,   16,

       0        // eod
};

void FileTransfer::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        FileTransfer *_t = static_cast<FileTransfer *>(_o);
        switch (_id) {
        case 0: _t->abort((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])),(*reinterpret_cast< int(*)>(_a[3]))); break;
        case 1: _t->download((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])),(*reinterpret_cast< const QString(*)>(_a[3])),(*reinterpret_cast< const QString(*)>(_a[4])),(*reinterpret_cast< bool(*)>(_a[5])),(*reinterpret_cast< int(*)>(_a[6])),(*reinterpret_cast< const QVariantMap(*)>(_a[7]))); break;
        case 2: _t->upload((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])),(*reinterpret_cast< const QString(*)>(_a[3])),(*reinterpret_cast< const QString(*)>(_a[4])),(*reinterpret_cast< const QString(*)>(_a[5])),(*reinterpret_cast< const QString(*)>(_a[6])),(*reinterpret_cast< const QString(*)>(_a[7])),(*reinterpret_cast< const QVariantMap(*)>(_a[8])),(*reinterpret_cast< bool(*)>(_a[9])),(*reinterpret_cast< bool(*)>(_a[10])),(*reinterpret_cast< const QVariantMap(*)>(_a[11])),(*reinterpret_cast< int(*)>(_a[12])),(*reinterpret_cast< const QString(*)>(_a[13]))); break;
        default: ;
        }
    }
}

const QMetaObject FileTransfer::staticMetaObject = {
    { &CPlugin::staticMetaObject, qt_meta_stringdata_FileTransfer.data,
      qt_meta_data_FileTransfer,  qt_static_metacall, 0, 0}
};


const QMetaObject *FileTransfer::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *FileTransfer::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_FileTransfer.stringdata))
        return static_cast<void*>(const_cast< FileTransfer*>(this));
    return CPlugin::qt_metacast(_clname);
}

int FileTransfer::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = CPlugin::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 3)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 3;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 3)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 3;
    }
    return _id;
}
QT_END_MOC_NAMESPACE
