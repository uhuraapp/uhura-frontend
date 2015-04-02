/****************************************************************************
** Meta object code from reading C++ file 'cordova.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.2.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../build/src/cordova.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'cordova.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.2.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_Cordova_t {
    QByteArrayData data[18];
    char stringdata[177];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    offsetof(qt_meta_stringdata_Cordova_t, stringdata) + ofs \
        - idx * sizeof(QByteArrayData) \
    )
static const qt_meta_stringdata_Cordova_t qt_meta_stringdata_Cordova = {
    {
QT_MOC_LITERAL(0, 0, 7),
QT_MOC_LITERAL(1, 8, 20),
QT_MOC_LITERAL(2, 29, 0),
QT_MOC_LITERAL(3, 30, 2),
QT_MOC_LITERAL(4, 33, 13),
QT_MOC_LITERAL(5, 47, 3),
QT_MOC_LITERAL(6, 51, 20),
QT_MOC_LITERAL(7, 72, 10),
QT_MOC_LITERAL(8, 83, 12),
QT_MOC_LITERAL(9, 96, 15),
QT_MOC_LITERAL(10, 112, 12),
QT_MOC_LITERAL(11, 125, 2),
QT_MOC_LITERAL(12, 128, 6),
QT_MOC_LITERAL(13, 135, 8),
QT_MOC_LITERAL(14, 144, 5),
QT_MOC_LITERAL(15, 150, 7),
QT_MOC_LITERAL(16, 158, 9),
QT_MOC_LITERAL(17, 168, 7)
    },
    "Cordova\0javaScriptExecNeeded\0\0js\0"
    "qmlExecNeeded\0src\0pluginWantsToBeAdded\0"
    "pluginName\0pluginObject\0pluginShortName\0"
    "loadFinished\0ok\0execJS\0setTitle\0title\0"
    "execQML\0appLoaded\0mainUrl\0"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_Cordova[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
       8,   14, // methods
       1,   80, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       3,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    1,   54,    2, 0x06,
       4,    1,   57,    2, 0x06,
       6,    3,   60,    2, 0x06,

 // slots: name, argc, parameters, tag, flags
      10,    1,   67,    2, 0x0a,
      12,    1,   70,    2, 0x0a,
      13,    1,   73,    2, 0x0a,
      15,    1,   76,    2, 0x0a,
      16,    0,   79,    2, 0x0a,

 // signals: parameters
    QMetaType::Void, QMetaType::QString,    3,
    QMetaType::Void, QMetaType::QString,    5,
    QMetaType::Void, QMetaType::QString, QMetaType::QObjectStar, QMetaType::QString,    7,    8,    9,

 // slots: parameters
    QMetaType::Void, QMetaType::Bool,   11,
    QMetaType::Void, QMetaType::QString,    3,
    QMetaType::Void, QMetaType::QString,   14,
    QMetaType::Void, QMetaType::QString,    5,
    QMetaType::Void,

 // properties: name, type, flags
      17, QMetaType::QString, 0x00095401,

       0        // eod
};

void Cordova::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        Cordova *_t = static_cast<Cordova *>(_o);
        switch (_id) {
        case 0: _t->javaScriptExecNeeded((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 1: _t->qmlExecNeeded((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 2: _t->pluginWantsToBeAdded((*reinterpret_cast< const QString(*)>(_a[1])),(*reinterpret_cast< QObject*(*)>(_a[2])),(*reinterpret_cast< const QString(*)>(_a[3]))); break;
        case 3: _t->loadFinished((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 4: _t->execJS((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 5: _t->setTitle((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 6: _t->execQML((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 7: _t->appLoaded(); break;
        default: ;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        void **func = reinterpret_cast<void **>(_a[1]);
        {
            typedef void (Cordova::*_t)(const QString & );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&Cordova::javaScriptExecNeeded)) {
                *result = 0;
            }
        }
        {
            typedef void (Cordova::*_t)(const QString & );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&Cordova::qmlExecNeeded)) {
                *result = 1;
            }
        }
        {
            typedef void (Cordova::*_t)(const QString & , QObject * , const QString & );
            if (*reinterpret_cast<_t *>(func) == static_cast<_t>(&Cordova::pluginWantsToBeAdded)) {
                *result = 2;
            }
        }
    }
}

const QMetaObject Cordova::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_Cordova.data,
      qt_meta_data_Cordova,  qt_static_metacall, 0, 0}
};


const QMetaObject *Cordova::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *Cordova::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Cordova.stringdata))
        return static_cast<void*>(const_cast< Cordova*>(this));
    return QObject::qt_metacast(_clname);
}

int Cordova::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 8)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 8;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 8)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 8;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QString*>(_v) = mainUrl(); break;
        }
        _id -= 1;
    } else if (_c == QMetaObject::WriteProperty) {
        _id -= 1;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 1;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 1;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 1;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 1;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 1;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 1;
    } else if (_c == QMetaObject::RegisterPropertyMetaType) {
        if (_id < 1)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 1;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void Cordova::javaScriptExecNeeded(const QString & _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void Cordova::qmlExecNeeded(const QString & _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void Cordova::pluginWantsToBeAdded(const QString & _t1, QObject * _t2, const QString & _t3)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)), const_cast<void*>(reinterpret_cast<const void*>(&_t3)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}
QT_END_MOC_NAMESPACE
