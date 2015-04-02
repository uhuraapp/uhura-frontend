/****************************************************************************
** Meta object code from reading C++ file 'qmlplugin.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.2.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../build/src/qmlplugin.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#include <QtCore/qplugin.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'qmlplugin.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.2.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_CordovaWrapper_t {
    QByteArrayData data[23];
    char stringdata[264];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    offsetof(qt_meta_stringdata_CordovaWrapper_t, stringdata) + ofs \
        - idx * sizeof(QByteArrayData) \
    )
static const qt_meta_stringdata_CordovaWrapper_t qt_meta_stringdata_CordovaWrapper = {
    {
QT_MOC_LITERAL(0, 0, 14),
QT_MOC_LITERAL(1, 15, 20),
QT_MOC_LITERAL(2, 36, 0),
QT_MOC_LITERAL(3, 37, 2),
QT_MOC_LITERAL(4, 40, 20),
QT_MOC_LITERAL(5, 61, 10),
QT_MOC_LITERAL(6, 72, 12),
QT_MOC_LITERAL(7, 85, 15),
QT_MOC_LITERAL(8, 101, 13),
QT_MOC_LITERAL(9, 115, 3),
QT_MOC_LITERAL(10, 119, 8),
QT_MOC_LITERAL(11, 128, 5),
QT_MOC_LITERAL(12, 134, 12),
QT_MOC_LITERAL(13, 147, 1),
QT_MOC_LITERAL(14, 149, 9),
QT_MOC_LITERAL(15, 159, 19),
QT_MOC_LITERAL(16, 179, 15),
QT_MOC_LITERAL(17, 195, 16),
QT_MOC_LITERAL(18, 212, 3),
QT_MOC_LITERAL(19, 216, 6),
QT_MOC_LITERAL(20, 223, 24),
QT_MOC_LITERAL(21, 248, 6),
QT_MOC_LITERAL(22, 255, 7)
    },
    "CordovaWrapper\0javaScriptExecNeeded\0"
    "\0js\0pluginWantsToBeAdded\0pluginName\0"
    "pluginObject\0pluginShortName\0qmlExecNeeded\0"
    "src\0setTitle\0title\0loadFinished\0b\0"
    "appLoaded\0getSplashscreenPath\0"
    "getDataLocation\0isUrlWhiteListed\0uri\0"
    "config\0CordovaInternal::Config*\0wwwDir\0"
    "mainUrl\0"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_CordovaWrapper[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
      10,   14, // methods
       2,   90, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       3,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    1,   64,    2, 0x06,
       4,    3,   67,    2, 0x06,
       8,    1,   74,    2, 0x06,

 // slots: name, argc, parameters, tag, flags
      10,    1,   77,    2, 0x0a,
      12,    1,   80,    2, 0x0a,
      14,    0,   83,    2, 0x0a,

 // methods: name, argc, parameters, tag, flags
      15,    0,   84,    2, 0x02,
      16,    0,   85,    2, 0x02,
      17,    1,   86,    2, 0x02,
      19,    0,   89,    2, 0x02,

 // signals: parameters
    QMetaType::Void, QMetaType::QString,    3,
    QMetaType::Void, QMetaType::QString, QMetaType::QObjectStar, QMetaType::QString,    5,    6,    7,
    QMetaType::Void, QMetaType::QString,    9,

 // slots: parameters
    QMetaType::Void, QMetaType::QString,   11,
    QMetaType::Void, QMetaType::Bool,   13,
    QMetaType::Void,

 // methods: parameters
    QMetaType::QString,
    QMetaType::QString,
    QMetaType::Bool, QMetaType::QString,   18,
    0x80000000 | 20,

 // properties: name, type, flags
      21, QMetaType::QString, 0x00095903,
      22, QMetaType::QString, 0x00095401,

       0        // eod
};

void CordovaWrapper::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        CordovaWrapper *_t = static_cast<CordovaWrapper *>(_o);
        switch (_id) {
        case 0: _t->javaScriptExecNeeded((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 1: _t->pluginWantsToBeAdded((*reinterpret_cast< const QString(*)>(_a[1])),(*reinterpret_cast< QObject*(*)>(_a[2])),(*reinterpret_cast< const QString(*)>(_a[3]))); break;
        case 2: _t->qmlExecNeeded((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 3: _t->setTitle((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 4: _t->loadFinished((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 5: _t->appLoaded(); break;
        case 6: { QString _r = _t->getSplashscreenPath();
            if (_a[0]) *reinterpret_cast< QString*>(_a[0]) = _r; }  break;
        case 7: { QString _r = _t->getDataLocation();
            if (_a[0]) *reinterpret_cast< QString*>(_a[0]) = _r; }  break;
        case 8: { bool _r = _t->isUrlWhiteListed((*reinterpret_cast< const QString(*)>(_a[1])));
            if (_a[0]) *reinterpret_cast< bool*>(_a[0]) = _r; }  break;
        case 9: { CordovaInternal::Config* _r = _t->config();
            if (_a[0]) *reinterpret_cast< CordovaInternal::Config**>(_a[0]) = _r; }  break;
        default: ;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (CordovaWrapper::*_t)(const QString & );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&CordovaWrapper::javaScriptExecNeeded)) {
                *result = 0;
            }
        }
        {
            typedef void (CordovaWrapper::*_t)(const QString & , QObject * , const QString & );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&CordovaWrapper::pluginWantsToBeAdded)) {
                *result = 1;
            }
        }
        {
            typedef void (CordovaWrapper::*_t)(const QString & );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&CordovaWrapper::qmlExecNeeded)) {
                *result = 2;
            }
        }
    }
}

const QMetaObject CordovaWrapper::staticMetaObject = {
    { &QQuickItem::staticMetaObject, qt_meta_stringdata_CordovaWrapper.data,
      qt_meta_data_CordovaWrapper,  qt_static_metacall, 0, 0}
};


const QMetaObject *CordovaWrapper::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *CordovaWrapper::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_CordovaWrapper.stringdata))
        return static_cast<void*>(const_cast< CordovaWrapper*>(this));
    return QQuickItem::qt_metacast(_clname);
}

int CordovaWrapper::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QQuickItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 10)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 10;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 10)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 10;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QString*>(_v) = wwwDir(); break;
        case 1: *reinterpret_cast< QString*>(_v) = mainUrl(); break;
        }
        _id -= 2;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setWwwDir(*reinterpret_cast< QString*>(_v)); break;
        }
        _id -= 2;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 2;
    } else if (_c == QMetaObject::RegisterPropertyMetaType) {
        if (_id < 2)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 2;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void CordovaWrapper::javaScriptExecNeeded(const QString & _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void CordovaWrapper::pluginWantsToBeAdded(const QString & _t1, QObject * _t2, const QString & _t3)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)), const_cast<void*>(reinterpret_cast<const void*>(&_t3)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void CordovaWrapper::qmlExecNeeded(const QString & _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}
struct qt_meta_stringdata_CordovaUbuntuPlugin_t {
    QByteArrayData data[1];
    char stringdata[21];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    offsetof(qt_meta_stringdata_CordovaUbuntuPlugin_t, stringdata) + ofs \
        - idx * sizeof(QByteArrayData) \
    )
static const qt_meta_stringdata_CordovaUbuntuPlugin_t qt_meta_stringdata_CordovaUbuntuPlugin = {
    {
QT_MOC_LITERAL(0, 0, 19)
    },
    "CordovaUbuntuPlugin\0"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_CordovaUbuntuPlugin[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

       0        // eod
};

void CordovaUbuntuPlugin::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    Q_UNUSED(_o);
    Q_UNUSED(_id);
    Q_UNUSED(_c);
    Q_UNUSED(_a);
}

const QMetaObject CordovaUbuntuPlugin::staticMetaObject = {
    { &QQmlExtensionPlugin::staticMetaObject, qt_meta_stringdata_CordovaUbuntuPlugin.data,
      qt_meta_data_CordovaUbuntuPlugin,  qt_static_metacall, 0, 0}
};


const QMetaObject *CordovaUbuntuPlugin::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *CordovaUbuntuPlugin::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_CordovaUbuntuPlugin.stringdata))
        return static_cast<void*>(const_cast< CordovaUbuntuPlugin*>(this));
    return QQmlExtensionPlugin::qt_metacast(_clname);
}

int CordovaUbuntuPlugin::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QQmlExtensionPlugin::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    return _id;
}

QT_PLUGIN_METADATA_SECTION const uint qt_section_alignment_dummy = 42;

#ifdef QT_NO_DEBUG

QT_PLUGIN_METADATA_SECTION
static const unsigned char qt_pluginMetaData[] = {
    'Q', 'T', 'M', 'E', 'T', 'A', 'D', 'A', 'T', 'A', ' ', ' ',
    0x71, 0x62, 0x6a, 0x73, 0x01, 0x00, 0x00, 0x00,
    0xb8, 0x00, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00,
    0xa4, 0x00, 0x00, 0x00, 0x1b, 0x03, 0x00, 0x00,
    0x03, 0x00, 0x49, 0x49, 0x44, 0x00, 0x00, 0x00,
    0x28, 0x00, 0x6f, 0x72, 0x67, 0x2e, 0x71, 0x74,
    0x2d, 0x70, 0x72, 0x6f, 0x6a, 0x65, 0x63, 0x74,
    0x2e, 0x51, 0x74, 0x2e, 0x51, 0x51, 0x6d, 0x6c,
    0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f,
    0x6e, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x66, 0x61,
    0x63, 0x65, 0x00, 0x00, 0x9b, 0x0a, 0x00, 0x00,
    0x09, 0x00, 0x63, 0x6c, 0x61, 0x73, 0x73, 0x4e,
    0x61, 0x6d, 0x65, 0x00, 0x13, 0x00, 0x43, 0x6f,
    0x72, 0x64, 0x6f, 0x76, 0x61, 0x55, 0x62, 0x75,
    0x6e, 0x74, 0x75, 0x50, 0x6c, 0x75, 0x67, 0x69,
    0x6e, 0x00, 0x00, 0x00, 0x3a, 0x40, 0xa0, 0x00,
    0x07, 0x00, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6f,
    0x6e, 0x00, 0x00, 0x00, 0x11, 0x00, 0x00, 0x00,
    0x05, 0x00, 0x64, 0x65, 0x62, 0x75, 0x67, 0x00,
    0x15, 0x13, 0x00, 0x00, 0x08, 0x00, 0x4d, 0x65,
    0x74, 0x61, 0x44, 0x61, 0x74, 0x61, 0x00, 0x00,
    0x0c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x0c, 0x00, 0x00, 0x00,
    0x88, 0x00, 0x00, 0x00, 0x44, 0x00, 0x00, 0x00,
    0x7c, 0x00, 0x00, 0x00, 0x6c, 0x00, 0x00, 0x00
};

#else // QT_NO_DEBUG

QT_PLUGIN_METADATA_SECTION
static const unsigned char qt_pluginMetaData[] = {
    'Q', 'T', 'M', 'E', 'T', 'A', 'D', 'A', 'T', 'A', ' ', ' ',
    0x71, 0x62, 0x6a, 0x73, 0x01, 0x00, 0x00, 0x00,
    0xb8, 0x00, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00,
    0xa4, 0x00, 0x00, 0x00, 0x1b, 0x03, 0x00, 0x00,
    0x03, 0x00, 0x49, 0x49, 0x44, 0x00, 0x00, 0x00,
    0x28, 0x00, 0x6f, 0x72, 0x67, 0x2e, 0x71, 0x74,
    0x2d, 0x70, 0x72, 0x6f, 0x6a, 0x65, 0x63, 0x74,
    0x2e, 0x51, 0x74, 0x2e, 0x51, 0x51, 0x6d, 0x6c,
    0x45, 0x78, 0x74, 0x65, 0x6e, 0x73, 0x69, 0x6f,
    0x6e, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x66, 0x61,
    0x63, 0x65, 0x00, 0x00, 0x95, 0x0a, 0x00, 0x00,
    0x08, 0x00, 0x4d, 0x65, 0x74, 0x61, 0x44, 0x61,
    0x74, 0x61, 0x00, 0x00, 0x0c, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x1b, 0x0e, 0x00, 0x00, 0x09, 0x00, 0x63, 0x6c,
    0x61, 0x73, 0x73, 0x4e, 0x61, 0x6d, 0x65, 0x00,
    0x13, 0x00, 0x43, 0x6f, 0x72, 0x64, 0x6f, 0x76,
    0x61, 0x55, 0x62, 0x75, 0x6e, 0x74, 0x75, 0x50,
    0x6c, 0x75, 0x67, 0x69, 0x6e, 0x00, 0x00, 0x00,
    0x31, 0x00, 0x00, 0x00, 0x05, 0x00, 0x64, 0x65,
    0x62, 0x75, 0x67, 0x00, 0x3a, 0x40, 0xa0, 0x00,
    0x07, 0x00, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6f,
    0x6e, 0x00, 0x00, 0x00, 0x0c, 0x00, 0x00, 0x00,
    0x44, 0x00, 0x00, 0x00, 0x60, 0x00, 0x00, 0x00,
    0x88, 0x00, 0x00, 0x00, 0x94, 0x00, 0x00, 0x00
};
#endif // QT_NO_DEBUG

QT_MOC_EXPORT_PLUGIN(CordovaUbuntuPlugin, CordovaUbuntuPlugin)

QT_END_MOC_NAMESPACE
