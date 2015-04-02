/****************************************************************************
** Meta object code from reading C++ file 'inappbrowser.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.2.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../build/src/plugins/org.apache.cordova.inappbrowser/inappbrowser.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'inappbrowser.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.2.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
struct qt_meta_stringdata_Inappbrowser_t {
    QByteArrayData data[15];
    char stringdata[150];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    offsetof(qt_meta_stringdata_Inappbrowser_t, stringdata) + ofs \
        - idx * sizeof(QByteArrayData) \
    )
static const qt_meta_stringdata_Inappbrowser_t qt_meta_stringdata_Inappbrowser = {
    {
QT_MOC_LITERAL(0, 0, 12),
QT_MOC_LITERAL(1, 13, 4),
QT_MOC_LITERAL(2, 18, 0),
QT_MOC_LITERAL(3, 19, 2),
QT_MOC_LITERAL(4, 22, 3),
QT_MOC_LITERAL(5, 26, 10),
QT_MOC_LITERAL(6, 37, 14),
QT_MOC_LITERAL(7, 52, 4),
QT_MOC_LITERAL(8, 57, 5),
QT_MOC_LITERAL(9, 63, 15),
QT_MOC_LITERAL(10, 79, 15),
QT_MOC_LITERAL(11, 95, 16),
QT_MOC_LITERAL(12, 112, 16),
QT_MOC_LITERAL(13, 129, 12),
QT_MOC_LITERAL(14, 142, 6)
    },
    "Inappbrowser\0open\0\0cb\0url\0windowName\0"
    "windowFeatures\0show\0close\0injectStyleFile\0"
    "injectStyleCode\0injectScriptFile\0"
    "injectScriptCode\0loadFinished\0status\0"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_Inappbrowser[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
       8,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags
       1,    5,   54,    2, 0x0a,
       7,    2,   65,    2, 0x0a,
       8,    2,   70,    2, 0x0a,
       9,    4,   75,    2, 0x0a,
      10,    4,   84,    2, 0x0a,
      11,    4,   93,    2, 0x0a,
      12,    4,  102,    2, 0x0a,
      13,    1,  111,    2, 0x0a,

 // slots: parameters
    QMetaType::Void, QMetaType::Int, QMetaType::Int, QMetaType::QString, QMetaType::QString, QMetaType::QString,    3,    2,    4,    5,    6,
    QMetaType::Void, QMetaType::Int, QMetaType::Int,    2,    2,
    QMetaType::Void, QMetaType::Int, QMetaType::Int,    2,    2,
    QMetaType::Void, QMetaType::Int, QMetaType::Int, QMetaType::QString, QMetaType::Bool,    3,    2,    2,    2,
    QMetaType::Void, QMetaType::Int, QMetaType::Int, QMetaType::QString, QMetaType::Bool,    3,    2,    2,    2,
    QMetaType::Void, QMetaType::Int, QMetaType::Int, QMetaType::QString, QMetaType::Bool,    3,    2,    2,    2,
    QMetaType::Void, QMetaType::Int, QMetaType::Int, QMetaType::QString, QMetaType::Bool,    3,    2,    2,    2,
    QMetaType::Void, QMetaType::Int,   14,

       0        // eod
};

void Inappbrowser::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        Inappbrowser *_t = static_cast<Inappbrowser *>(_o);
        switch (_id) {
        case 0: _t->open((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])),(*reinterpret_cast< const QString(*)>(_a[3])),(*reinterpret_cast< const QString(*)>(_a[4])),(*reinterpret_cast< const QString(*)>(_a[5]))); break;
        case 1: _t->show((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 2: _t->close((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 3: _t->injectStyleFile((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])),(*reinterpret_cast< const QString(*)>(_a[3])),(*reinterpret_cast< bool(*)>(_a[4]))); break;
        case 4: _t->injectStyleCode((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])),(*reinterpret_cast< const QString(*)>(_a[3])),(*reinterpret_cast< bool(*)>(_a[4]))); break;
        case 5: _t->injectScriptFile((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])),(*reinterpret_cast< const QString(*)>(_a[3])),(*reinterpret_cast< bool(*)>(_a[4]))); break;
        case 6: _t->injectScriptCode((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])),(*reinterpret_cast< const QString(*)>(_a[3])),(*reinterpret_cast< bool(*)>(_a[4]))); break;
        case 7: _t->loadFinished((*reinterpret_cast< int(*)>(_a[1]))); break;
        default: ;
        }
    }
}

const QMetaObject Inappbrowser::staticMetaObject = {
    { &CPlugin::staticMetaObject, qt_meta_stringdata_Inappbrowser.data,
      qt_meta_data_Inappbrowser,  qt_static_metacall, 0, 0}
};


const QMetaObject *Inappbrowser::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *Inappbrowser::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Inappbrowser.stringdata))
        return static_cast<void*>(const_cast< Inappbrowser*>(this));
    return CPlugin::qt_metacast(_clname);
}

int Inappbrowser::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = CPlugin::qt_metacall(_c, _id, _a);
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
    return _id;
}
QT_END_MOC_NAMESPACE
